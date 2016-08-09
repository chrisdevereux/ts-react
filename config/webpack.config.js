const webpack = require('webpack');
const lodash = require('lodash');
const autoprefixer = require('autoprefixer')
const flexbugs = require('postcss-flexbugs-fixes')

const path = require('path')
const _ = require('lodash')

const browsers = ['> 2%', 'ie >= 10']

const development = process.env.NODE_ENV !== 'production'
const processEnv = _.fromPairs(
  Object.keys(process.env).map(key => ['process.env.' + key, JSON.stringify(process.env[key])])
)

module.exports = {
  devtool: development ? 'eval-source-map' : undefined,
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: process.env['PUBLIC_PATH'] || '/',
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.webpack.js', '.web.js', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]!postcss!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  ts: {
    transpileOnly: true,
    compilerOptions: {
      isolatedModules: true,
      noEmitOnError: false
    }
  },
  postcss: () => [flexbugs, autoprefixer({ browsers })],
  entry: [
    'es6-promise',
    path.resolve(__dirname, '../src/client.tsx'),
    ...(
      development ? [
        'webpack-hot-middleware/client?reload=true',
      ] : []
    ),
  ],
  plugins: [
    new webpack.DefinePlugin(processEnv),
    ...(
      development ? [
        new webpack.optimize.OccurenceOrderPlugin(false),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ] : [
        new webpack.optimize.OccurenceOrderPlugin(false),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            properties: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            unused: true,
            loops: true,
            hoist_funs: true,
            cascade: true,
            if_return: true,
            join_vars: true,
            negate_iife: true,
            unsafe: true,
            hoist_vars: true,
          },
          output: {
            comments: false,
          },
        }),
      ]
    ),
  ],
}
