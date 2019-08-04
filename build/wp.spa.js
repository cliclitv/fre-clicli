const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const baseConfig = require('./wp.base')
const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(baseConfig, {
  entry: {
    app: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/spa'),
    filename: 'js/[name].js',
    publicPath: isDev ? 'http://localhost:2333/' : 'https://cdn.jsdelivr.net/gh/cliclitv/vue-clicli@latest/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/spa"),
    hot: true,
    compress: true,
    port: 2333,
    historyApiFallback: true,
  }
})

