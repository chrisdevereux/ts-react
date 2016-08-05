const configure = require('./webpack.common');
const opts = Object.assign(
  { NODE_ENV: 'development', PORT: 8000 },
  require('./dev.private.json')
)

module.exports = configure(opts)
