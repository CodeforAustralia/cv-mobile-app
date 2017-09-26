module.exports = function (state, emitter) {
  initialise()

  function initialise () {
    state.messages = [{
      content: 'Hi Dave, you have a meeting at 10am tomorrow (Monday), 21st August with Sharon at Ballarat CCS, 206 Mair Street.',
      outbound: false,
      receivedOrSentDate: '2017-09-15 09:00:00',
      response: true,
      seenDate: '2017-09-15 10:30:00',
      messageType: 'App'
    }, {
      content: 'OK',
      outbound: true,
      receivedOrSentDate: '2017-09-15 18:45:00',
      response: false,
      seenDate: '2017-09-15 18:45:00',
      messageType: 'App'
    }, {
      content: 'Thanks for coming today Dave',
      outbound: false,
      receivedOrSentDate: '2017-09-21 09:05:00',
      response: false,
      seenDate: null,
      messageType: 'App'
    }, {
      content: 'N',
      outbound: true,
      receivedOrSentDate: '2017-09-21 13:20:25',
      response: false,
      seenDate: null,
      messageType: 'SMS'
    }]

    state.status = false

    state.content = 'Hiya'
  }

  emitter.on('sendResponse', function (data) {
    var today = new Date()

    state.messages.push({
      content: data,
      outbound: true,
      receivedOrSentDate: today.toString(),
      response: false,
      seenDate: today.toString(),
      messageType: 'App'
    })

    // also need to send to db

    emitter.emit('render')
  })
}
