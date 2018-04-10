const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true,
          extractCSS: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[ext]'
            }
          }
        ]
      }
    ]

  }
}