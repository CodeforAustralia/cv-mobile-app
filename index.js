// require dependencies
var choo = require('choo')
var reload = require('choo-reload')

// initialise app
var app = choo()
app.use(reload())

// declare state
app.use(require('./state'))

// import stylesheets

// declare routes
app.route('/', require('./templates/reminders'))

// start app
document.body.appendChild(app.start())
