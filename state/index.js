module.exports = function (state, emitter) {
  // run on app start
  initialise()

  function initialise () {
    state.user = {
      phone: ''
    }

    state.messages = []
    state.status = false

    state.content = 'Hiya'

    state.to = ''
    state.from = ''
    state.testMessage = ''
    state.sent = false
  }

  // declare bus handlers
  emitter.on('updateContent', function (data) {
    state.user.phone = data['Phones'][0]['PhoneNumber']

    var message
    for (message of data['Messages']) {
      var newMessage = {
        content: message['MessageContents'],
        receivedOrSentDate: message['DateDelivered'],
        messageType: message['MessageType'],
        direction: message[`Outbound`] ? 'outbound' : 'inbound'
      }

      state.messages.push(newMessage)
    }

    state.status = true
    emitter.emit('render')
  })

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

  emitter.on('sendSMS', function () {
    state.sent = true
    emitter.emit('render')
  })

  emitter.on('updateNewSMS', function (data) {
    state[data.id] = data.text
  })
}
