const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? 'https://www.clicli.me' : '/'
  },
  resolve: {
    alias: {
      component: path.resolve(__dirname, 'src/component'),
      public: path.resolve(__dirname, 'src/public'),
      api: path.resolve(__dirname, 'src/api'),
      widget: path.resolve(__dirname, 'src/widget')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*/**', '!CNAME']
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    })
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    hot: true
  }
}