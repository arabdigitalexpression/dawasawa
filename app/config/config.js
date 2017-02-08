	if (process.env.DAWASAWA_DEBUG != true ) {
//		production : {
			module.exports.database_uri : 'mongodb://172.17.0.2:27017/dawasawa';
			module.exports.site_url: 'http://dawasawa.online';
//		},
	}
	else {
		// database conection
//		development : {
			module.exports.database_uri : 'mongodb://localhost:27017/dawasawa';
			module.exports.site_url: 'http://localhost:3000';
//		},
	}

module.exports = {
	// app config
	app_name : 'دواسوا',
	app_port : '3000',


	insertion_confirmation_grace : 24,	//hours
	email_address_from : 'robot@dawasawa.online',
	email_address_writeus : 'webmaster@dawasawa.online',
	expiry_acceptance_threshold : 60,	//no listig can be accepted if it expires sooner than this number of days
	expiry_removal_threshold : 30,		//listings are removed from our index when there remains this number of days until they expire

}
