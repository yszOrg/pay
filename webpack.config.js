const webpack = require('webpack')
const path = require('path')

const config  = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
         {
           loader: 'babel-loader',
           query: {presets: ['react']}
         }
      ]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

if (process.env.NODE_ENV === 'dev'){
  config.entry.unshift('webpack-hot-middleware');
  config.module.rules[0].use.unshift({loader: 'react-hot-loader'})
}

module.exports = config;
