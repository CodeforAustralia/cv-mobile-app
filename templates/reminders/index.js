// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// import templates
var api = require('../../lib/api')
var base = require('../base')
var style = css('./style.css')

// export module
module.exports = function (state, emit) {
  return base(reminders, 'Reminders')

  function reminders () {
    return html`
      <content class=${style} onload=${state.status ? null : queryAPI()}>
        ${displayMessages()}
        <div class="input">
          <input placeholder="Message ... " type="text" />
          <div> + </div>
        </div>
      </content>`
  }

  // pull message data from the API
  function queryAPI () {
    api(function (data) {
      emit('updateContent', data)
    })
  }

  function displayMessages () {
    return state.messages.map(function (message, index) {
      return html`
      <div>
        <div class="${message.direction}">
          ${displayTime(message, index)}
          <div class="message">${message.content}</div>
        </div>
      </div>`
    })
  }

  // display possible responses to inbound message
  // currently not working - needs template metadata
  // function displayResponse () {
  //   return html`
  //       <div>
  //         <button id="OK" onclick=${sendResponse}>OK</button>
  //         <button id="Reschedule" onclick=${sendResponse}>Reschedule</button>
  //       </div>
  //     `
  // }
  // 
  // function sendResponse (e) {
  //   emit('sendResponse', e.target.id)
  // }

  function displayTime (message, index) {
    var myDate = new Date(message.receivedOrSentDate)
    var today = new Date()

    var newDayDisplay = true

    var timeToDisplay = ''
    var timeDisplayOptions = {hour: '2-digit', minute: '2-digit', hour12: true}

    if (index !== 0) {
      var prevMsgDate = new Date(state.messages[index - 1].receivedOrSentDate)

      if (prevMsgDate.toDateString() === myDate.toDateString()) {
        newDayDisplay = false
      }
    }

    // if message was sent on a different day, display date in full
    if (newDayDisplay) {
      if (myDate.toDateString() === today.toDateString()) {
        timeToDisplay = 'Today, '
      } else {
        timeDisplayOptions.weekday = 'short'
        timeDisplayOptions.day = 'numeric'
        timeDisplayOptions.month = 'short'
      }

      return html`<p class="newDate">${timeToDisplay} ${myDate.toLocaleString([], timeDisplayOptions)}</p>`
    } else {
      timeToDisplay = 'Sent '

      if (message.messageType === 'SMS') {
        timeToDisplay += 'via SMS at '
      }

      return html`<p>${timeToDisplay} ${myDate.toLocaleString([], timeDisplayOptions)}</p>`
    }
  }
}
