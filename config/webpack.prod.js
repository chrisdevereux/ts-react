const configure = require('./webpack.common');
const opts = Object.assign(
  { NODE_ENV: 'production' },
  process.env
)

module.exports = configure(opts)
