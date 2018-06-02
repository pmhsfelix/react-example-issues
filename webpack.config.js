var path = require('path')

console.log("DIR" + __dirname)

module.exports = {
  entry: {
    main: './js/index.js',
    redirect: './js/redirect.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-3']
          }
        }
      }
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: {
      disableDotRule: true
    }
  }
}
