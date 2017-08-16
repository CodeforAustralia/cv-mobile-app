// TODO
// styling
// basic html
// submission

// require dependencies
var html = require('choo/html')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  return html`
    <div>
      <div class="banner"></div>
      <span>this is your first time logging in. please reset your password</span>
      <div class="form-field">
        <input type="password" id="password" placeholder="password" />
      </div>
      <div class="form-field">
        <input type="password" id="confirmPassword" placeholder="confirm password" />
      </div>
      <button class="submit">submit</button>
    </div>
    `
}
