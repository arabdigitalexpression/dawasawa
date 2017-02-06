module.exports = {
	// app config
	app_name : 'دواسوا',
	app_port : '3000',

	// database conection
	development : {
		database_uri : 'mongodb://localhost:27017/dawasawa',
		url: `http://localhost:3000`
	},

	production : {
		database_uri : 'mongodb://172.17.0.2:27017/dawasawa',
		url: `http://dawasawa.online`
	},

	// email configuration
	email_user: '',
	email_pass: ''
}
