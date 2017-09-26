// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// import templates
var api = require('../../lib/api')
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
        justify-content: center;
        min-height: 100%;
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
        width: -moz-max-content;
        width: -webkit-max-content;
      }

      .inbound > div {
        background-color: #e4e4e4;
        color: #6f6e75;
        width: max-content;
        width: -moz-max-content;
        width: -webkit-max-content;
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
        width: -moz-max-content;
        width: -webkit-max-content;
      }

      input {
        align-self: center;
        background-color: #e4e4e4;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 1rem;
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
        height: 2.5rem;
        width: 100%;
      }

      .input > div {
        align-self: center;
        color: #6f6e75;
        font-size: 2rem;
        margin-left: 0.5rem;
      }

      button {
        border: 2px solid white;
        color: #6f6e75;
        font-size: 1rem;
        margin: 0.5rem 5% 0rem 5%;
        padding: 0.5rem;
        width: 90%;
      }
    `

    return html`
      <content class=${style} onload=${state.status ? null : queryAPI()}>
        ${displayMessages()}
        <div class="input">
          <input placeholder="Message ... " type="text" />
          <div> + </div>
        </div>
      </content>`
  }

  function queryAPI () {
    api(function (data) {
      emit('updateContent', data)
    })
  }

  // look over this again - this code is hideous (quick hack solution)

  function displayMessages () {
    return state.messages.map(function (message, index) {
      return html`
      <div>
        ${message.outbound
          ? html`<div class="outbound">
                ${displayTime(message, index)}
                <div class="message">${message.content}</div>
                </div>`
          : html`<div class="inbound">
                ${displayTime(message, index)}
                <div class="message">
                  ${message.content}
                  ${message.response ? displayResponse() : null}
                </div>
              </div>`}
      </div>`
    })
  }

  function displayResponse () {
    return html`
        <div>
          <button id="OK" onclick=${sendResponse}>OK</button>
          <button id="Reschedule" onclick=${sendResponse}>Reschedule</button>
        </div>
      `
  }

  function sendResponse (e) {
    emit('sendResponse', e.target.id)
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
