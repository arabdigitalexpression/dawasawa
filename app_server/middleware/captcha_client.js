const request = require('request'),
	  Config = require('../config/config')

let CaptchaClient = {}

CaptchaClient.validateCaptcha = function(req, res, next) {
	request({
			method: 'POST',
			uri: Config.captcha_server_uri,
			body: req.body.captcha,
			cookies : req.cookies
		},
		function(error, response, body) {
			console.log(response.statusCode)
			if(error)
				return res.sendStatus(500)
			else if(response.statusCode == 200){
				next()
			} else {
				return res.sendStatus(response.statusCode)
			}
		}
	)}

module.exports = CaptchaClient