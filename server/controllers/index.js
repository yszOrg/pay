const path = require('path')
module.exports = function (req, res){
  res.sendFile(path.resolve(__dirname, '../../', 'index.html'))
}
