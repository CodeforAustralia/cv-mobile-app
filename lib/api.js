var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = function (cb) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      cb(xmlHttp.responseText)
    }
  }

  xmlHttp.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true)
  xmlHttp.send(null)
}
