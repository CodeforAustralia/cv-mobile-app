// require dependencies
var choo = require('choo')
var css = require('sheetify')

// initialise app
var app = choo()

// declare state
app.use(require('./state'))

// import stylesheets
css('./assets/style.css')

// declare routes
app.route('/', require('./templates/login'))
app.route('/home', require('./templates/home'))
app.route('/resetPassword', require('./templates/resetPassword'))
app.route('/forgottenPassword', require('./templates/forgottenPassword'))

// start app
document.body.appendChild(app.start())
