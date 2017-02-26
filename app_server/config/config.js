let config = {}

config.database_uri = 'mongodb://172.17.0.2:27017/dawasawa'
config.site_url = 'https://dawasawa.online'
config.email_address_from = 'robot@dawasawa.online'
config.email_address_writeus = 'webmaster@dawasawa.online'


// services
config.captcha_server_uri = 'http://172.17.0.x:4000/captcha' //change the IP in production
config.email_server_uri = 'http://172.17.0.x:5000/captcha' //change the IP in production

// app config
config.app_name = 'دواسوا'
config.app_port = '3000'

config.insertion_challenge_grace = 48		// (hours) the entry is removed from the system if not confirmed by this period 
config.listings_challenge_grace = 48		// (hours) the entry is removed from the system if not confirmed by this period 
config.expiry_acceptance_threshold = 60	// (days) no listig can be accepted if it expires sooner than this number of days
config.expiry_removal_threshold = 30		// (days) listings are removed from our index when there remains this number of days until they expire

//a long random string, possible teh result of openssl rand 32 -hex
//Changing this during operation will invalidate all verification tokens
config.token_secret_key = 'ctIXAq9o3E81JWguImTDajqzk69LmYpUXIcyY3l+47Q'	//CHANGE FOR PRODUCTION
config.encryption_cipher = 'aes-128-gcm'		//Changing this during operation will invalidate all verification tokens


if (process.env.NODE_ENV == 'Development' ) {
//		development overriding settings
		config.database_uri = 'mongodb://localhost:27017/dawasawa'
		config.site_url = 'http://localhost:3000'
		config.email_address_from = 'gundourtesting@gmail.com'
		config.email_address_writeus = 'gundourtesting@gmail.com'
		config.encryption_cipher = 'aes128'
		config.captcha_server_uri = 'http://localhost:4000/captcha'
		config.email_server_uri = 'http://localhost:5000'
}

module.exports = config

