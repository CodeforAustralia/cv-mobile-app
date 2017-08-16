// require dependencies
var html = require('choo/html')

// import templates
var error = require('../error')
var spinner = require('../spinner')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  var password = ''
  var confirmPassword = ''
  var loading = state.loading

  return html`
    <div>
      <div class="banner"></div>
      <div class="message">this is your first time logging in. please reset your password</div>
      <div class="form-field">
        <input type="password" id="password" placeholder="password" value=${password} oninput=${updateInput} />
      </div>
      <div class="form-field">
        <input type="password" id="confirmPassword" placeholder="confirm password" value=${confirmPassword} oninput=${updateInput}/>
      </div>
      <div>
        ${loading ? spinner() : html`<button class="submit" onclick=${submit}>log in</button>`}
      </div>
      ${error(state, emit)}
    </div>
  `

// this is ugly, there's a more elegant way to do it
  function updateInput (e) {
    if (e.target.id === 'password') {
      password = e.target.value
    } else {
      confirmPassword = e.target.value
    }
  }

  function submit (e) {
    emit('toggleLoading')

// toy validation
    setTimeout(function () {
      emit('toggleLoading')

      if (password === '') {
        emit('error', 'you must enter a new password')
      } else if (password === confirmPassword) {
        emit('updatePassword', password)
        emit('errorClear')
        emit('pushState', '/home')
      } else {
        emit('error', `these passwords don't match`)
      }
    }, 1000)
  }
}
