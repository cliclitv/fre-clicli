const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const baseConfig = require('./wp.base')

const plugins = [
  new MiniCssExtractPlugin({
    filename: "../css/[name].css",
    chunkFilename: "css/[id].css"
  }),
  new webpack.DefinePlugin({
    'process.env.VUE_ENV': '"server"'
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

module.exports = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-build.js',
    path: path.resolve(__dirname, '../dist/js')
  },
  optimization: {
    splitChunks: false
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
      }
    ]
  },
  plugins
})
