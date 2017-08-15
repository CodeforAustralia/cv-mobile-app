// require dependencies
var choo = require('choo')

// initialise app
var app = choo()

// declare state
app.use(require('./state'))

// declare routes
app.route('/', require('./templates/login'))

// start app
document.body.appendChild(app.start())
