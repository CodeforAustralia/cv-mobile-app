// require dependencies
var html = require('choo/html')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  return html`
    <div>
      <div class="banner"></div>
      <div class="wrapper">welcome to your home screen ${state.user.email} :)</div>
      <div class="message">you have been successfully logged in</div>
    </div>
    `
}
