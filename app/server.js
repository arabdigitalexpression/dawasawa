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
// var list_entries = require('./routes/list_entries');
// var emailus = require('./routes/emailus');
// var verify = require('./routes/verify');
// var mylist = require('./routes/mylist');
// var search = require('./routes/search');
// var single = require('./routes/single');



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
// app.use('/list_entries', list_entries);
// app.use('/verify', verify);
// app.use('/mylist', mylist);
// app.use('/search', search);
// app.use('/medicine', single);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status);
  res.redirect('/404');
});





// start the server
var server = http.createServer(app);
server.listen(app_config.app_port, function() {
	console.log('server is running on port: %s in %s mode', app_config.app_port, process.env.NODE_ENV);
});
