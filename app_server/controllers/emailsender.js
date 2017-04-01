const request = require('request'),
	  config = require('../config/config')

module.exports.sendmail = function(action, data) {
	/*
	 * sends request to email server with email info
	 */
	console.log(data)
	request({
			method: 'POST',
			uri: config.EMAIL_SERVER_URL + action,
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

