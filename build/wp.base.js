const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: isDev ? 'http://localhost:2333/' : '/'
  },
  optimization: {},
  resolve: {
    alias: {
      component: path.resolve(__dirname, '../client/component'),
      common: path.resolve(__dirname, '../client/common'),
      api: path.resolve(__dirname, '../client/api'),
      base: path.resolve(__dirname, '../client/base'),
      store: path.resolve(__dirname, '../client/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-1'],
            plugins: ['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]

  }
}