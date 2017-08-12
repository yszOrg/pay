const TestCtrl = require('./controllers/test')
const IndexCtrl = require('./controllers/index')
module.exports = function(app){
  app.get('/', IndexCtrl)
  app.get('/test', TestCtrl.GET)
  app.post('/test', TestCtrl.POST)
}
