module.exports = function (state, emitter) {
  initialise()

  function initialise () {
    state.user = {
      phone: ''
    }

    state.messages = new Array()
    state.status = false

    state.content = 'Hiya'
  }

  emitter.on('updateContent', function (data) {
    state.user.phone = data['Phones'][0]['PhoneNumber']

    console.log(state.user.phone)

    for (message of data['Messages']) {
      var newMessage = {
        content: message['MessageContents'],
        receivedOrSentDate: message['DateDelivered'],
        messageType: message['MessageType']
      }

      if (message['From'] === state.user.phone) {
        newMessage.outbound = false
      } else {
        newMessage.outbound = true
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
