module.exports = function (state, emitter) {

  emitter.on('updateName', function (data) {
    state.name = data
    emitter.emit('render')
  })
}
