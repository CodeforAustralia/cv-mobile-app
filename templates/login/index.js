// require dependencies
var html = require('choo/html')

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

  return html`
    <div>
      <div class="banner"></div>
      <div class="form-field">
        <input type="text" id="email" value=${email} placeholder="email address" oninput=${updateInput} />
      </div>
      <div class="form-field wrapper">
        <label>remember my email
          <input type="checkbox" />
        </label>
      </div>
      <div class="form-field">
        <input type="password" id="password" value=${password} placeholder="password" oninput=${updateInput} />
      </div>
      <div>
        ${loading ? spinner() : html`<button class="submit" onclick=${submit}>log in</button>`}
      </div>
      ${error(state, emit)}
      <div>
        <button>
          <a href="/forgottenPassword">i forgot my password</a>
        </button>
      </div>
    </div>
  `

  function updateInput (e) {
    var id = e.target.id
    var text = e.target.value.toLowerCase()

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
        emit('error', `the email address or password you've entered is incorrect, please try again (hint: try success@test.net or reset@test.net)`)
      } else {
        emit('errorClear')
        emit('pushState', '/home')
      }
    }, 1000)
  }
}
