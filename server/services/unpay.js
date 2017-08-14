const WxPay = require('./wxpay')
const AliPay = require('./alipay')

function wxParaBuild(para){
  return {
    attach: para.prd_title,
    body: para.prd_detail,
    detail: '',
    out_trade_no: + new Date(),
    total_fee: para.prd_fee * 100
  }
}

function aliParaBuild(para){
  return {
    subject: para.prd_title,
    body: para.prd_detail,
    total_fee: para.prd_fee
  }
}

module.exports = class {
  constructor(cfg){
    this.wxConfig = cfg.wxpay
    this.aliConfig = cfg.alipay
    if (this.wxConfig){
      this.wxPay = new WxPay(this.wxConfig)
    }
    if (this.aliConfig) {
      this.aliPay = new AliPay(this.aliConfig) 
    }
    
  }

  pc(para, type) {
    var promise = new Promise((resolve, reject) => {

      if (type === 'wxpay'){
        this.wxPay.createUnifiedOrder(wxParaBuild(para), (err, result) => {
          if (err){
            reject(err)
          }else{
            resolve(result)
          }
          
        })
      }else if (type === 'alipay'){
        var alipayRedirect = this.aliPay.directPayByUser(aliParaBuild(para));
        resolve(alipayRedirect)
      }else{
        reject('unknown pay method!')
      }
      
    })
    return promise
  }

}