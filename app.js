var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var reaper = require('./controllers/reaper');

//  config
var app_port = (process.env.PORT || 3000);
var database_uri = 'mongodb://localhost:27017/dawasawa';

// connect to database
var db = mongoose.connect(database_uri);

// start the app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./routes/api')(app);



// start the server
var server = http.createServer(app);
server.listen(app_port, function() {
	reaper.startReaper();
	console.log('server is running on port: ' + app_port);
});