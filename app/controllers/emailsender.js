const app_config = require('../config/config');
const sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: ``,
    keySelector: ''
  }
})


// Sends token ladden email messages to confrm actions
module.exports.sendEmail = function(email, subject, data) {
	return new Promise(function(resolve, reject) {
		sendmail({
			from: app_config.email_address_from,
			to: email,
			subject: subject,
			html: data.html
		}, function(err, reply) {
			if(err) {
				console.log(err);
				reject(err);
			}
			resolve(reply);
		})
	});
}

// Sends email through /emailus form to a specified address
module.exports.receiveEmail = function(body) {
	console.log('user email' + body.user_email);
	return new Promise(function(resolve, reject) {
		sendmail({
			from: app_config.email_address_writeus, 
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
			if(err) {
				console.log(err);
				reject(err);
			}
			resolve(reply);
		})
	});
}
