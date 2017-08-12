const request = require('request')
const md5 = require('md5')
const xml2js = require('xml2js')
const QRCode = require('QRCode')
const util = require('./util')

module.exports = WxPay;

function WxPay() {
  if (!(this instanceof WxPay)) {
    return new WxPay(arguments[0])
  }
  this.options = arguments[0]
  this.wxpayId = {appid: this.options.appid, mch_id:this.options.mch_id}
}

WxPay.prototype.sign = function(param){
  var querystring = Object.keys(param).filter(key => !!param[key] && ['pfx', 'secret', 'sign', 'key'].indexOf(key) < 0 )
  .sort()
  .map(key => key + '=' + param[key])
  .join('&') + '&key=' + this.options.secret
  return md5(querystring).toUpperCase();
  
}
WxPay.prototype.createUnifiedOrder = function(opts, fn) {
  opts.nonce_str = opts.nonce_str || util.generateRandomString()
  opts = Object.assign({
    trade_type: 'NATIVE',
    notify_url: this.options.notify_url
  }, opts, this.wxpayId)
  opts.sign = this.sign(opts)
  var xml = new xml2js.Builder().buildObject(opts)
  request({
    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    method: 'POST',
    headers: {'Content-Type': 'text/xml'},
    body: xml
  }, (err, response, body) => {
    var parser = new xml2js.Parser({trim: true, explicitArray:false, explicitRoot:false})
    parser.parseString(body, (err, result) => {
      QRCode.toDataURL(result.code_url, (err, url) => {
         result.img_code_url = url
         fn(err, result)
      })    
    })
  })
}
