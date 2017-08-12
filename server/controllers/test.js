const request = require('request')
const WxPay = require('../services/wxpay')
const wxConfig = require('../config.json').wxpay
const wxpay = new WxPay(wxConfig)

module.exports = {
  GET: function(req, res){
    const data  = {
      title: '测试商品',
      description: '只要0.99，大甩卖',
      fee: 1
    }
    res.render('test', data)
  },
  POST: function(req, res){
    var orderObj = {
      attach: req.body.prd_title,
      body: req.body.prd_detail,
      detail: '',
      out_trade_no: + new Date(),
      total_fee: req.body.prd_fee
    }
    wxpay.createUnifiedOrder(orderObj, (err, result) => {
      res.render('test-pro', result)   
    })
   
  }
}
