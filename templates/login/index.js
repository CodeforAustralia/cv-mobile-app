// TODO
// styling
// placeholders
// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// export module
module.exports = login

// declare templates
function login (state, emit) {
  var style = css`
    :host {
      background-color: #3399ff;
    }
  `

  return html`
    <div class=${style}>
      <div class="form-field">
        <input type="text" id="email" value=${email} placeholder="email address" oninput=${updateInput} />
        <input type="checkbox" /> Remember Me
      </div>
      <div class="form-field">
        <input type="password" id="password" value=${password} placeholder="password" oninput=${updateInput} />
      </div>
      <div>
        ${loading ? spinner() : html`<button class="submit" onclick=${submit}>Log In</button>`}
      </div>
      <div>
        <a href="/forgottenPassword">I forgot my password</a>
      </div>
    </div>
  `
  
}
