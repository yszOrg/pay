const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const layouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const env = process.env.NODE_ENV

if (env === 'dev'){
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {}))
  app.use(webpackHotMiddleware(compiler))
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(layouts)

require('./router')(app)

app.listen(8080, () => {
  console.log('app runing on :8080')
})
