const util = require('./util')
const fs = require('fs') 
const path = require('path')
const md5 = require('md5')

module.exports = AliPay

function AliPay() {
  if (!(this instanceof AliPay)){
    return new AliPay(arguments[0])
  }
  this.options = arguments[0]
  this.alipayCfg = {}
  this.getewayUrl = 'https://mapi.alipay.com/gateway.do'
  this.rasPrivate = fs.readFileSync(path.resolve(__dirname, '../rsa_private_key.pem'))
  this.rasPublic = fs.readFileSync(path.resolve(__dirname, '../rsa_public_key.pem'))
}

AliPay.prototype.sign = function(param) {
  var querystring = Object.keys(param)
    .filter(key => !!param[key])
    .sort()
    .map(key => key + '=' + param[key])
    .join('&')
  querystring += this.options.md5
  return  md5(querystring)
}

/**
 * @param {Object} opts
 * @param {Float} total_fee //金额
 * @param {String} [body] //商品描述
 * @param {String} [show_url] //商品链接
 * @param {String} [exter_invoke_ip] //用户ip
 */
AliPay.prototype.directPayByUser = function(opts){

  opts = Object.assign({
    service: 'create_direct_pay_by_user',
    partner: this.options.pid,
    _input_charset: 'UTF-8',
    notify_url: this.options.notify_url || '',
    return_url: this.options.return_url || '',
    out_trade_no: util.generateRandomString(19) + Date.now(),
    payment_type: 1,
    seller_id: this.options.pid,
    it_b_pay: '1d'
  }, opts)
  
  var querystring  = Object.keys(opts)
    .filter(key => !!key)
    .map(key => key + '=' + encodeURIComponent(opts[key]))
    .join('&')
  querystring += `&sign=${this.sign(opts)}&sign_type=MD5`
  return this.getewayUrl + '?' + querystring
}