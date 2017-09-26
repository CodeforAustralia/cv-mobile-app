var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = function (cb) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var obj = JSON.parse(xmlHttp.responseText)
      cb(obj)
    }
  }

  xmlHttp.open('GET', 'https://samaradionne.com/brian/client_obj.php?JAID=333', true)
  xmlHttp.send(null)
}
