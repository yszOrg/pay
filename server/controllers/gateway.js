const Validate = require('../services/validate')
const Util = require('../services/util')

module.exports = function(req, res){
  var validateResult =  Validate.gatewayRequest(req)
  if (validateResult.error){
    return res.json(validateResult.error)
  }
  
  var wxOrderObj = {
      body: req.body.prd_title,
      detail: req.body.prd_detail,
      out_trade_no: Util.generateRandomString(32),
      total_fee: req.body.prd_fee * 100
    }
    var aliOrderObj = {
      subject: req.body.prd_title,
      body: req.body.prd_detail,
      out_trade_no: Util.generateRandomString(32),
      total_fee: req.body.prd_fee
    }
    if (req.body.pay_type === 'wxpay'){
      unPay.pc(req.body, 'wxpay')
        .then(ret => {
          res.json({
            type: 'wxpay',
            method: 'qrcode',
            data: ret.img_code_url
          })
        })
    }else{
      unPay.pc(req.body, 'alipay')
        .then(ret => {
          res.json({
            type: 'alipay',
            method: 'url',
            data: ret
          })
        })
    }

}