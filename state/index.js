module.exports = function (state, emitter) {
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

  emitter.on('sendSMS', function () {
    state.sent = true
    console.log('rendering')
    emitter.emit('render')
  })

  emitter.on('updateNewSMS', function (data) {
    state[data.id] = data.text
  })

  emitter.on('updateContent', function (data) {
    state.user.phone = data['Phones'][0]['PhoneNumber']

    console.log(state.user.phone)

    var message

    for (message of data['Messages']) {
      var newMessage = {
        content: message['MessageContents'],
        receivedOrSentDate: message['DateDelivered'],
        messageType: message['MessageType']
      }

      if (message['From'] === state.user.phone) {
        newMessage.direction = 'inbound'
      } else {
        newMessage.direction = 'outbound'
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
}
