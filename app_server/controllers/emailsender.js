const request = require('request'),
	  Config = require('../config/config')

module.exports.sendmail = function(action, data) {
	/*
	 * sends request to email server with email info
	 */
	console.log(data)
	request({
			method: 'POST',
			uri: Config.email_server_uri + action,
			json: true,
			body: data
		},
		function(error, response, body) {
			if(error)
				return console.log(error)
			else{
				console.log(response.statusCode)
				console.log(body)
			}
		}
	)
}

