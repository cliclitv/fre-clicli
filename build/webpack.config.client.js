const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  target: 'web',
  resolve: {
    alias: {
      component: path.resolve(__dirname, '../src/component'),
      common: path.resolve(__dirname, '../src/common'),
      api: path.resolve(__dirname, '../src/api'),
      base: path.resolve(__dirname, '../src/base'),
      store: path.resolve(__dirname, '../src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
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
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    compress: true,
    port: 2333,
    historyApiFallback: true,
    proxy: {
      '/user/': {
        target: 'http://localhost:4000'
      },
      '/article/': {
        target: 'http://localhost:4000'
      }
    }
  }
})
