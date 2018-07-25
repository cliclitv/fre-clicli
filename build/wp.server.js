const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const baseConfig = require('./wp.base')

const plugins = [
  new VueServerPlugin(),
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "../css/[name].css",
    chunkFilename: "css/[id].css"
  }),
  new webpack.DefinePlugin({
    'process.env.VUE_ENV': '"server"'
  })
]

module.exports = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-build.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: false
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
          use: [
            isDev ? 'vue-style-loader' :
              MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' :
            MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true
        }
      },
    ]
  },
  plugins
})
