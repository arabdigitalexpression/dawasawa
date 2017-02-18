var config = {};

config.database_uri = 'mongodb://172.17.0.2:27017/dawasawa';
config.site_url = 'https://dawasawa.online';
config.email_address_from = 'robot@dawasawa.online';
config.email_address_writeus = 'webmaster@dawasawa.online';

// app config
config.app_name = 'دواسوا';
config.app_port = '3000';


config.insertion_confirmation_grace = 48;	// (hours) the entry is removed from the system if not confirmed by this period 
config.expiry_acceptance_threshold = 60;	// (Days) no listig can be accepted if it expires sooner than this number of days
config.expiry_removal_threshold = 30;		// (Days)listings are removed from our index when there remains this number of days until they expire
config.token_secret_key = '** CHANGE ON PRODUCTION SERVER **';		//a long rando string


if (process.env.NODE_ENV == 'Development' ) {
//		development overriding settings
		config.database_uri = 'mongodb://localhost:27017/dawasawa';
		config.site_url = 'http://localhost:3000';
		config.email_address_from = 'gundourtesting@gmail.com';
		config.email_address_writeus = 'gundourtesting@gmail.com'
}

module.exports = config;

