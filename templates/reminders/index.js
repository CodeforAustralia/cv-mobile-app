// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// import templates
var base = require('../base')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  return base(reminders, 'Reminders')

  function reminders () {
    var style = css`
      content {
        background-color: #f4f4f4;
        display: flex;
        font-family: Helvetica;
        flex-direction: column;
        height: 100vh;
      }

      .message {
        border-radius: 5px;
        margin: 0.2rem 0.5rem 0.5rem 0.5rem;
        max-width: 60vw;
        padding: 0.5rem 0.75rem;
      }

      .newDate {
        margin: 0;
        text-align: center;
        width: 100%;
      }

      p {
        color: #6f6e75;
        font-size: 0.7rem;
        margin: 0 0.5rem;
        width: max-content;
      }

      .inbound > div {
        background-color: #e4e4e4;
        color: #6f6e75;
        width: max-content;
      }

      .outbound {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
      }

      .outbound > * {
        align-self: flex-end;
      }

      .outbound > div {
        background-color: #fff;
        color: #4e4d56;
        width: max-content;
      }

      input {
        align-self: center;
        background-color: #e4e4e4;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        height: 1.5rem;
        padding: 0 0.5rem;
        width: 80%;
      }

      .input {
        background-color: #fff;
        bottom: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: fixed;
        height: 2rem;
        width: 100%;
      }

      .input > div {
        align-self: center;
        color: #6f6e75;
        font-size: 1.5rem;
        margin-left: 0.5rem;
      }
    `

    return html`
      <content class=${style}>
        ${displayMessages()}
        <div class="input">
          <input placeholder="Message ... " type="text" />
          <div> + </div>
        </div>
      </content>`
  }

  // come back to

  function displayMessages () {
    return state.messages.map(function (message, index) {
      return html`
      <div>
        ${message.outbound ?
          html`<div class="outbound">
                ${displayTime(message, index)}
                <div class="message">${message.content}</div>
                </div>` :
          html`<div class="inbound">
                ${displayTime(message, index)}
                <div class="message">${message.content}</div>
                </div>`}
      </div>`
    })
  }

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
