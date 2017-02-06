var nodemailer = require('nodemailer');

// load the config file
var app_config = require('../config/config');


var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: app_config.email_user,
		pass: app_config.email_pass
	}
});



module.exports.sendEmail = function(email, subject, data) {
	console.log('sending.....');
	return new Promise(function(resolve, reject) {
		var mailOptions = {
			from: app_config.email_user,
			to: email,
			subject: subject,
			html: data.html
		}

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				reject(err);
			}
			else {
				resolve();
			}
		})
	});
}

module.exports.receiveEmail = function(body) {
	return new Promise(function(resolve, reject) {
		var mailOptions = {
			from: body.name + '&lt;' + body.email + '&gt;' ,
			to: app_config.email_user,
			subject: 'استمارة الاتّصال',
			html: '<div align="right">'
					+ '<p align="right">بيانات المرسل</p>'
					+ '<p align="right">' + body.user_name + '&lt;' + body.user_email + '&gt;' + '</p>'
					+ '<br>'
					+ '<p align="right">الرسالة</p>'
					+ '<p align="right">' + body.user_message + '</p>'
					+ '</div>'
		}

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				reject(err);
			}
			else {
				resolve(info);
				console.log(info);
			}
		})
	});
}
