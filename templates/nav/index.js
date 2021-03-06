// require dependencies
var html = require('choo/html')
var css = require('sheetify')

// navigation template
module.exports = function (title) {
  var style = css`
    :host {
      display: flex;
      flex-direction: row;
      font-family: Helvetica;
      justify-content: space-between;
      margin: 1rem 0;
    }

    img {
      max-width: 5vw;
      position: absolute;
      left: 0.5rem;
    }

    div:nth-child(3) > img {
      display: none;
    }
  `

  return html`
    <nav class=${style}>
      <div>
        <a href="#" onclick=${test}>
        <img src="/assets/back-icon.png" />
        </a>
      </div>
      <div>${title}</div>
      <div><img src="/assets/back-icon.png" /></div>
    </nav>
  `

  function test () {
    history.back()
    return false
  }
}
