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
      font-family: Arial;
      font-size: 20px;
    }

    :host > .banner {
      background-color: #49654C;
      height: 4rem;
      margin-bottom: 1rem;
    }

    .form-field {
      margin-bottom: 1rem;
    }

    input[type=text], input[type=password] {
      border: 0px;
      border-bottom: 1px solid black;
      font-size: 20px;
      margin-left: 10%;
      width: 80%;
    }

    .wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;
    }

    input[type=checkbox] {
      height: 20px;
      vertical-align: middle;
      width: 20px;
    }

    button {
      background-color: #8AA989;
      border: none;
      border-radius: 2px;
      color: #EBEBE9;
      font-size: 20px;
      height: 2.5rem;
      margin-left: 15%;
      margin-bottom: 1rem;
      width: 70%;
    }

    .submit { background-color: #C0CEB2; }

    a {
      color: white;
      text-decoration: none;
    }

    .warning {
      display: flex;
      justify-content: centre;
      margin-left: 10%;
      width: 80%;
    }

    .warning > p {
      font-size: 14px;
      margin: 0;
      margin-bottom: 1rem;
    }

    .spinner {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 2rem;
    }
  `

  return html`
    <div class=${style}>
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
        emit('error', `the email address or password you've entered is incorrect, please try again (hint: try success@test.net or reset@test.net)`)
      } else {
        emit('errorClear')
        emit('pushState', '/home')
      }
    }, 1000)
  }
}
