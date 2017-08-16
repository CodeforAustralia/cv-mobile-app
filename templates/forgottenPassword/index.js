// require dependencies
var html = require('choo/html')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  var email = ''
  var submitted = state.passwordResetSubmitted

  return html`
    <div>
      <div class="banner"></div>
      <div class="form-field">
        <input type="text" id="email" placeholder="email address" value=${email} oninput=${updateInput} />
      </div>
      <div>
        <button class="submit" onclick=${submit}>submit password reset</button>
      </div>
      ${submitted ? html`<div class="message">your request has been submitted. please check your email address</div>` : html`<div class="message">don't remember your email address? ask your case manager for assistance</div>`}
    </div>
    `

  function updateInput (e) {
    email = e.target.value
  }

  function submit (e) {
    emit('passwordReset')
  }
}
