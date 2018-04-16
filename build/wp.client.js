const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('./wp.base')

module.exports = merge(baseConfig, {
  target: 'web',
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
    new VueClientPlugin(),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    compress: true,
    port: 2333,
    historyApiFallback: true,
    proxy: {
      '/user/': {
        target: 'http://www.idanmu.cc'
      },
      '/article/': {
        target: 'http://www.idanmu.cc'
      }
    }
  }
})
