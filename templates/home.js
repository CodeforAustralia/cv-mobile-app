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
      <div>Hello ${state.name}</div>
      <button onclick=${onclick}>Update name!</button>
    </div>
  `

  function onclick () {
    emit('updateName', 'Sam')
  }
}
