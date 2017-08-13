module.exports = function (state, emitter) {
  state.name = 'Georgia'

  emitter.on('updateName', function (data) {
    state.name = data
    emitter.emit('render')
  })
}
