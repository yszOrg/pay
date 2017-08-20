const TestCtrl = require('./controllers/test')
const IndexCtrl = require('./controllers/index')
const GatewayCtrl = require('./controllers/gateway')
module.exports = function(app){
  app.get('/', IndexCtrl)
  app.post('/gateway', GatewayCtrl)
  app.get('/test', TestCtrl.GET)
  app.post('/test', TestCtrl.POST)
}
