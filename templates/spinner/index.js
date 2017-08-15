var html = require('choo/html')
var css = require('sheetify')

css('./spinner.css')

module.exports = function () {
  return html`<div class="sp sp-circle"></div>`
}
