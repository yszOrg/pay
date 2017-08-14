const request = require('request')
const config = require('../config.json')
const UnPay = require('../services/unpay')

const unPay = new UnPay(config)

module.exports = {
  GET: function(req, res){
    const data  = {
      title: '测试商品',
      description: '只要0.99，大甩卖',
      fee: 0.01
    }
    res.render('test', data)
  },
  POST: function(req, res){
    var wxOrderObj = {
      attach: req.body.prd_title,
      body: req.body.prd_detail,
      detail: '',
      out_trade_no: + new Date(),
      total_fee: req.body.prd_fee * 100
    }
    var aliOrderObj = {
      subject: req.body.prd_title,
      body: req.body.prd_detail,
      total_fee: req.body.prd_fee
    }
    if (req.body.pay_type === 'wxpay'){
      unPay.pc(req.body, 'wxpay')
        .then(ret => {
          res.write(ret.img_code_url)
          res.end()
        })
    }else{
      unPay.pc(req.body, 'alipay')
        .then(ret => {
          res.write(ret)
          res.end()
        })
    }
  }
}
