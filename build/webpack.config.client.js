const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')


module.exports = merge(baseConfig, {
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
    port: 1122,
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
