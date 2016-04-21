var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require("copy-webpack-plugin")
var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var path = require('path')

var prod = process.env.MIX_ENV === 'prod'

var entry = './app/assets/javascripts/application.js'

var publicPath = 'http://localhost:3001/'

//
// plugins & loaders
//

var plugins = [
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([{
    from: "./web/static/assets"
  }])
]

var loaders = [
  {
    loader: "babel-loader",
    test: /\.js$/,
    include: __dirname,
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  }
]

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  plugins.push(new ExtractTextPlugin("bundle.css"))
  loaders.unshift({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      "style",
      [
        "css?modules&importLoaders=1&localIdentName=[hash:base64:20]",
        "postcss"
      ]
    )
  })
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  loaders.unshift({
    test: /\.css$/,
    loader: "style!css?modules&importLoaders=1&localIdentName=[hash:base64:20]!postcss"
  })
  loaders.unshift({
    test: /\.js/,
    loader: 'react-hot',
    exclude: /node_modules/
  })
}

module.exports = {
  devtool: prod ? null : 'source-map',

  entry: prod ? entry : [
    'webpack-dev-server/client?' + publicPath,
    'webpack/hot/only-dev-server',
    entry
  ],

  output: {
    path: path.join(__dirname, './priv/static/js'),
    filename: 'bundle.js',
    publicPath: publicPath
  },

  postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ],

  plugins: plugins,

  module: {
    loaders: loaders
  }
}