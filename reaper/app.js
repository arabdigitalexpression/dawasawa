var mongoose = require('mongoose');


// define the environment
process.env.NODE_ENV = 'Development';

// load the config file
var app_config = require('./config/config');