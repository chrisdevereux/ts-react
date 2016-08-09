import * as express from 'express'

import app from './app'
import renderMiddleware from './router/server'

const server = express()

if (process.env.NODE_ENV !== 'production') {
  try {
    require('json-env')('./config/dev.private.json');

  } catch (error) {
    console.error('dev.private.json file not present in /config directory')
    process.exit(1)
  }

  // Dev-only middleware

  const webpack = require('webpack')
  const compiler = webpack(require('../config/webpack.config.js'))
  const hot = require('webpack-hot-middleware')
  const devserver = require('webpack-dev-middleware')

  server.use(devserver(compiler, {
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: true,
  }))

  server.use(hot(compiler))

} else {
  // Production-only middleware

  const helmet = require('helmet')
  server.use(helmet())
}

server.use(renderMiddleware(app))

const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log(`Application started on port ${port}`)
})
