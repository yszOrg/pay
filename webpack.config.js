const webpack = require('webpack')
const path = require('path')

const config  = {
  entry: ['webpack-hot-middleware/client','./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    hotUpdateChunkFilename: 'tmp/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'tmp/[hash].hot-update.json'
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
           loader: 'react-hot-loader'
         },
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


module.exports = config;
