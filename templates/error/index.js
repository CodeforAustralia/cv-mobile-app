// import dependencies
var html = require('choo/html')

// error template
module.exports = function (state, emit) {
  var error = state.error.bool
  var warning = state.error.text

  if (error) {
    return html`
      <div class="error">
        <div class="warning">
          <p>${warning}</p>
        </div>
      </div>
    `
  }
}
