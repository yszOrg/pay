module.exports.generateRandomString = function(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsquvwxyz0123456789';
  var len = chars.length;
  return Array(length||32).fill(1).map(k => chars.charAt(Math.floor(Math.random() * len))).join('')
}
