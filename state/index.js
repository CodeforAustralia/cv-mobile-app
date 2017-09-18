module.exports = function (state, emitter) {
  initialise()

  function initialise () {
    state.messages = [{
      content: 'Hi Dave, you have a meeting at 10am tomorrow (Monday), 21st August with Sharon at Ballarat CCS, 206 Mair Street.',
      outbound: false,
      receivedOrSentDate: '2017-09-15 09:00:00',
      seenDate: '2017-09-15 10:30:00'
    }, {
      content: 'OK',
      outbound: true,
      receivedOrSentDate: '2017-09-15 10:45:00',
      seenDate: '2017-09-15 10:45:00'
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
