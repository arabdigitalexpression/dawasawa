module.exports = {
	// app config
	app_name : 'دواسوا',
	app_port : '3002',
	domain: 'http://localhost:3002',

	// database conection
	// database_uri : 'mongodb://172.17.0.2:27017/dawasawa'
	development : {
		database_uri : 'mongodb://localhost:27017/dawasawa'
	},

	production : {
		database_uri : 'mongodb://172.17.0.2:27017/dawasawa'
	}
}
