var config = {};

if (process.env.NODE_ENV != 'Development' ) {
//		production
		config.database_uri = 'mongodb://172.17.0.2:27017/dawasawa';
		config.site_url = 'http://dawasawa.online';
		config.email_address_from = 'robot@dawasawa.online';
		config.email_address_writeus = 'webmaster@dawasawa.online';
}
else {
//		development
		config.database_uri = 'mongodb://localhost:27017/dawasawa';
		config.site_url = 'http://localhost:3000';
		config.email_address_from = 'gundourtesting@gmail.com';
		config.email_address_writeus = 'gundourtesting@gmail.com';
}

// app config
config.app_port = '3030';

config.insertion_confirmation_grace = 48;	// (hours) the entry is removed from the system if not confirmed by this period 
config.expiry_acceptance_threshold = 60;	// (Days) no listig can be accepted if it expires sooner than this number of days
config.expiry_removal_threshold = 30;		// (Days) listings are removed from our index when there remains this number of days until they expire
config.token_secret_key = '** CHANGE ON PRODUCTION SERVER **';		//a long rando string

module.exports = config;

