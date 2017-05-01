var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// load the config file
var config = require('./config/config');

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
var suggest = require('./routes/suggest');

// start the app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// generate cookies to store session_id
// app.use((req, res, next) => {
// 	let cookie = req.cookies.session_id
// 	if(cookie === undefined) {

// 		let randomNumber=Math.random().toString()
// 		randomNumber=randomNumber.substring(2,randomNumber.length)
// 		res.cookie('session_id',randomNumber, { httpOnly: true })
// 	}
// 	next()
// })

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
app.use('/api/suggest', suggest);

// start the server
var server = http.createServer(app);
server.listen(config.PORT, function() {
	console.log('%s is running on port: %s', config.NAME, config.PORT);
	// Connect to mongodb
	mongoose.connect(config.DB_HOST + ":" + config.DB_PORT + "/" + config.DB_NAME)
	mongoose.connection.on('error', function(err) {
        console.log('error', err);
        process.exit(1);
    });
    mongoose.connection.once('open', function(callback) {
        console.log('Connected to Database!');
    })

});
