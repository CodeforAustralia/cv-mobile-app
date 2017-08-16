module.exports = function (state, emitter) {
  initialise()

  function initialise () {
    state.user = {
      email: '',
      password: ''
    }

    state.error = {
      bool: false,
      text: ''
    }

    state.loading = false
    state.passwordResetSubmitted = false
  }

  emitter.on('updateInput', function (data) {
    var prop = data.id
    var value = data.text

    state.user[prop] = value
  })

  emitter.on('updatePassword', function (data) {
    state.user.password = data
  })

  emitter.on('passwordReset', function () {
    state.passwordResetSubmitted = true
    emitter.emit('render')
  })

  emitter.on('error', function (data) {
    state.error = {bool: true, text: data}
    emitter.emit('render')
  })

  emitter.on('errorClear', function (data) {
    state.error = {bool: false, text: ''}
    emitter.emit('render')
  })

  emitter.on('toggleLoading', function () {
    state.loading = !state.loading
    emitter.emit('render')
  })
}
