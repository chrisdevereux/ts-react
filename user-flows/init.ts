import * as express from 'express'
import { assign } from 'lodash'
import { execSync } from 'child_process'

import app from '../src/app'
import renderMiddleware from '../src/router/server'

const server = express()

// Stubbed environmental variables
process.env.PORT = process.env.PORT || 8000

// Stubbed API endpoints


// Page server
const webpack = require('webpack')
const compiler = webpack(require('../config/webpack.config.js'))
const devserver = require('webpack-dev-middleware')

server.use(devserver(compiler, {
  publicPath: '/',
  stats: { colors: true },
  historyApiFallback: true,
}))

server.use(renderMiddleware(app))


// Test Driver

const flowOpts = {
  tests: './user-flows',
  results: '.ui-test-results'
}

server.listen(process.env.PORT, () => {
  console.log(`Application started on port ${process.env.PORT}`)

  const flow = require('phantomflow').init(assign({ createReport: true }, flowOpts))
  flow.run((status: number) => {
    if (process.env.UI_TEST_ENV === 'CI') {
      if (status === 0) {
        const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' })
        if (branch === 'master') {
          console.log('Updating master branch with lastest UI test snapshots')

          execSync('git add user-flows/visuals')
          execSync('git commit -m "[CI] Updating UI test snapshots with latest"')
          execSync('git push origin master')
        }
      }

      process.exit(status)

    } else {
      if (status !== 0) {
        flow.report()
      }
    }
  })
})
