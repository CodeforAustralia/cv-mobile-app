// TODO
// styling
// placeholders

// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// import templates
var error = require('../error')
var spinner = require('../spinner')

// export module
module.exports = login

// declare templates
function login (state, emit) {
  var email = state.user.email
  var password = state.user.password

  var loading = state.loading

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
        ${error(state, emit)}
      </div>
      <div>
        <a href="/forgottenPassword">I forgot my password</a>
      </div>
    </div>
  `
  
  function updateInput (e) {
    var id = e.target.id
    var text = e.target.value

    emit('updateInput', {id: id, text: text})
  }

  function submit (e) {
    var email = state.user.email

    emit('toggleLoading')

// toy validation
    setTimeout(function () {
      emit('toggleLoading')

      if (email === 'reset@test.net') {
        emit('errorClear')
        emit('pushState', '/resetPassword')
      } else if (email !== 'success@test.net') {
        emit('error', 'The email address or password you have entered is incorrect, please try again')
      } else {
        emit('errorClear')
        emit('pushState', '/home')
      }
    }, 1000)
  }
}
