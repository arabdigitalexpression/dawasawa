var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// load the config file
var app_config = require('./config/config');

// load local dependencies
var index = require('./routes/index');
var submit = require('./routes/submit');
var captcha = require('./routes/captcha');
var list_entries = require('./routes/list_entries');
var emailus = require('./routes/emailus');
var about = require('./routes/about');
var terms = require('./routes/terms');
var data_policy = require('./routes/data_policy');
var disclaimer = require('./routes/disclaimer');
var verify = require('./routes/verify');
var mylist = require('./routes/mylist');
var search = require('./routes/search');
var single = require('./routes/single');


// define the environment
process.env.NODE_ENV = 'development';

// Connect to mongodb
if(process.env.NODE_ENV == 'development') {
	var db = mongoose.connect(app_config.development.database_uri);
} else if (process.env.NODE_ENV == 'production') {
	var db = mongoose.connect(app_config.production.database_uri);
}


// start the app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));




// application routes
app.use('/', index);
app.use('/submit', submit);
app.use('/captcha', captcha);
app.use('/list_entries', list_entries);
app.use('/emailus', emailus);
app.use('/about',about);
app.use('/terms',terms);
app.use('/data_policy',data_policy);
app.use('/disclaimer',disclaimer);
app.use('/verify', verify);
app.use('/mylist', mylist);
app.use('/search', search);
app.use('/medicine', single);







// start the server
var server = http.createServer(app);
server.listen(app_config.app_port, function() {
	console.log('server is running on port: ' + app_config.app_port);
});
