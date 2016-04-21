#!/usr/bin/env node
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  contentBase: 'http://localhost:3001',
  publicPath: config.output.publicPath,
  hot: true
}).listen(3001, '0.0.0.0', function (err, result) {
  if (err) console.error(err)
  console.log('webpack-dev-server running on port 3001')
})

// Exit on end of STDIN - make the process shut down
// properly when Phoenix shuts down.
process.stdin.resume()
process.stdin.on('end', function () {
  process.exit(0)
})