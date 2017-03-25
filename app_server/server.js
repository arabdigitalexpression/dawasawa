var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// define the environment
process.env.NODE_ENV = 'Development';

// load the config file
var app_config = require('./config/config');

// Connect to mongodb
var db = mongoose.connect(app_config.database_uri);


// load local dependencies
var index = require('./routes/index');
var submit = require('./routes/submit');
var instate = require('./routes/instate');
var list_entries = require('./routes/list_entries');
var mylist = require('./routes/mylist');
var remove = require('./routes/remove');
var search = require('./routes/search');
var emailus = require('./routes/emailus');
var medicine = require('./routes/medicine');

// start the app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// generate cookies to store session_id
app.use((req, res, next) => {
	let cookie = req.cookies.session_id
	if(cookie === undefined) {
		let randomNumber=Math.random().toString()
		randomNumber=randomNumber.substring(2,randomNumber.length)
		res.cookie('session_id',randomNumber, { httpOnly: true })
		console.log('cookie not existed')
	}
	next()
})

// application routes
app.use('/api', index);
app.use('/api/submit', submit);
app.use('/instate', instate);
app.use('/api/list_entries', list_entries);
app.use('/api/mylist', mylist);
app.use('/api/remove', remove);
app.use('/api/search', search);
app.use('/api/emailus', emailus);
app.use('/api/medicine',medicine);

// start the server
var server = http.createServer(app);
server.listen(app_config.app_port, function() {
	console.log('server is running on port: %s in %s mode', app_config.app_port, process.env.NODE_ENV);
});
