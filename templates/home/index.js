// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// export module
module.exports = home

// declare templates
function home (state, emit) {
  var messages = state.messages

  var style = css`
    :host {
      background-color: #f4f4f4;
      display: flex;
      font-family: Helvetica;
      flex-direction: column;
      height: 100vh;
    }

    :host > div > div {
      border-radius: 5px;
      margin: 0.2rem 0.5rem 0.5rem 0.5rem;
      max-width: 60vw;
      padding: 0.5rem;
    }

    :host > div {
    }

    p {
      color: #6f6e75;
      font-size: 0.75rem;
      margin: 0.5rem;
      margin-bottom: 0;
    }

    .inbound > div {
      background-color: #e4e4e4;
      color: #6f6e75;
    }

    .outbound {
      float: right;
      text-align: right;
    }

    .outbound > div {
      background-color: #ffffff;
      color: #4e4d56;
      float: right;
      text-align: right;
    }
  `

  return html`
    <container class=${style}>
      ${displayMessages()}
    </container>`

  function displayMessages () {
    return state.messages.map(function (message, index) {
      var myDate = new Date(message.receivedOrSentDate)

      return html`
        <div>
          <p>Sent ${myDate.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12: true})}</p>
          <div id="message${index}">
            ${message.content}
          </div>
        </div>
      `
    })
  }

  // function testAPI () {
  //   api(function (data) {
  //     emit('updateContent', data)
  //   })
  // }
}

      // <p>Test API call</p>
      // <button onclick=${testAPI}>Test</div>
      // ${content ? html`<p>${content}</p>` : null}
