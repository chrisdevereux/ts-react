require('json-env')('./config/dev.private.json')

import main from './src/server/main'
import * as webpack from 'webpack'

const compiler = webpack(require('./config/webpack.dev.js'))
const hot = require('webpack-hot-middleware')
const devserver = require('webpack-dev-middleware')

main([
  devserver(compiler, {
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: true,
  }),
  hot(compiler)
])
