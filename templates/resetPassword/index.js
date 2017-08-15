// TODO
// styling

// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  var style = css`
    :host {
      background-color: #3399ff;
      color: white;
    }
  `

  return html`
    <div class=${style}>
      <h2>There is where you will reset your password</h2>
    </div>
    `
}
