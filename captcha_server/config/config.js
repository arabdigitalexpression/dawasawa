var config = {};

// app config
config.app_name = 'captcha server';
config.app_port = '4000';

config.database_uri = 'mongodb://localhost:27017/dawasawa';

config.captcha_expiration_period = '1h' // The captcha expires after 1h

config.token_secret_key = 'ctIXAq9o3E81JWguImTDajqzk69LmYpUXIcyY3l+47Q'	//CHANGE FOR PRODUCTION
config.encryption_cipher = 'aes-128-gcm'		//Changing this during operation will invalidate all verification tokens
//config.encryption_cipher = 'aes192'		//Changing this during operation will invalidate all verification tokens

module.exports = config;

