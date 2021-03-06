import * as express from 'express'
import { assign } from 'lodash'

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
      process.exit(status)

    } else {
      if (status !== 0) {
        flow.report()
      }
    }
  })
})
