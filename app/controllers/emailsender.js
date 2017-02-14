var fs = require('fs');

var sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: fs.readFileSync('', 'utf8'),
    keySelector: ''
  }
})

// load the config file
var app_config = require('../config/config');

// production sendEmail
module.exports.sendEmail = function(email, subject, data) {
	return new Promise(function(resolve, reject) {
		sendmail({
			from: app_config.email_address_from,
			to: email,
			subject: subject,
			html: data.html
		}, function(err, reply) {
			if(err)
				reject(err);
			resolve(reply);
		})
	});
}

// production receiveEmail
module.exports.receiveEmail = function(body) {
	return new Promise(function(resolve, reject) {
		sendmail({
			from: body.name + '&lt;' + body.email + '&gt;' ,
			to: app_config.email_address_writeus,
			subject: 'استمارة الاتّصال',
			html: '<div align="right">'
					+ '<p align="right">بيانات المرسل</p>'
					+ '<p align="right">' + body.user_name + '&lt;' + body.user_email + '&gt;' + '</p>'
					+ '<br>'
					+ '<p align="right">الرسالة</p>'
					+ '<p align="right">' + body.user_message + '</p>'
					+ '</div>'
		}, function(err, reply) {
			if(err)
				reject(err);
			resolve(reply);
		})
	});
}
