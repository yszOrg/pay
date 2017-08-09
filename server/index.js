const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'))

const env = app.get('env')

if (env === 'dev'){
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {}))
  app.use(webpackHotMiddleware(compiler))
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(8080, () => {
  console.log('app runing on :8080')
})
