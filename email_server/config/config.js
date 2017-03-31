var config = {};

// app config
config.app_name = 'Email server';
config.app_port = '5000';

//config.site_url = 'https://dawasawa.online';
config.site_url='http://localhost'
config.email_address_from = 'robot@dawasawa.online';
config.email_address_writeus = 'gundourtesting@gmail.com';


config.insertion_challenge_grace = 48;		// (hours) the entry is removed from the system if not confirmed by this period
config.listings_challenge_grace = 48;		// (hours) the entry is removed from the system if not confirmed by this period


module.exports = config;

