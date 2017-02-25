var config = {};

// app config
config.app_name = 'captcha server';
config.app_port = '4000';

config.database_uri = 'mongodb://localhost:27017/dawasawa';

config.captcha_expiration_period = '1h' // The captcha expires after 1h

module.exports = config;

