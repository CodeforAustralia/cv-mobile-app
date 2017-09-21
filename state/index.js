module.exports = function (state, emitter) {
  initialise()

  function initialise () {
    state.messages = [{
      content: 'Hi Dave, you have a meeting at 10am tomorrow (Monday), 21st August with Sharon at Ballarat CCS, 206 Mair Street.',
      outbound: false,
      receivedOrSentDate: '2017-09-15 09:00:00',
      seenDate: '2017-09-15 10:30:00',
      messageType: 'App'
    }, {
      content: 'OK',
      outbound: true,
      receivedOrSentDate: '2017-09-15 18:45:00',
      seenDate: '2017-09-15 18:45:00',
      messageType: 'App'
    }, {
      content: 'Thanks for coming today Dave',
      outbound: false,
      receivedOrSentDate: '2017-09-21 09:05:00',
      seenDate: null,
      messageType: 'App'
    }, {
      content: 'N',
      outbound: true,
      receivedOrSentDate: '2017-09-21 13:20:25',
      seenDate: null,
      messageType: 'SMS'
    }]
  }

  emitter.on('DOMContentLoaded', function () {
    state.messages.map(function (message, index) {
      if (message.outbound) {
        document.getElementById(`message${index}`).parentElement.classList.add('outbound')
      } else {
        document.getElementById(`message${index}`).parentElement.classList.add('inbound')
      }
    })
  })
}
