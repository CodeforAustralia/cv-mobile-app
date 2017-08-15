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
      <h2>Welcome to your home screen ${state.user.email} :)</h2>
      <p>You have been successfully logged in</p>
    </div>
    `
}
