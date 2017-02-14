var fs = require('fs');
var nodemailer = require('nodemailer');
var sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: fs.readFileSync('', 'utf8'),
    keySelector: ''
  }
})

// load the config file
var app_config = require('../config/config');


var transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: app_config.email_address_from,
		pass: ''
	}
});


// development sendEmail
// module.exports.sendEmail = function(email, subject, data) {
// 	return new Promise(function(resolve, reject) {
// 		var mailOptions = {
// 			from: app_config.email_address_from,
// 			to: email,
// 			subject: subject,
// 			html: data.html
// 		}

// 		transporter.sendMail(mailOptions, function(err, info) {
// 			if(err) {
// 				reject(err);
// 			}
// 			else {
// 				resolve();
// 			}
// 		})
// 	});
// }


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

// development receiveEmail
// module.exports.receiveEmail = function(body) {
// 	return new Promise(function(resolve, reject) {
// 		var mailOptions = {
// 			from: body.name + '&lt;' + body.email + '&gt;' ,
// 			to: app_config.email_address_writeus,
// 			subject: 'استمارة الاتّصال',
// 			html: '<div align="right">'
// 					+ '<p align="right">بيانات المرسل</p>'
// 					+ '<p align="right">' + body.user_name + '&lt;' + body.user_email + '&gt;' + '</p>'
// 					+ '<br>'
// 					+ '<p align="right">الرسالة</p>'
// 					+ '<p align="right">' + body.user_message + '</p>'
// 					+ '</div>'
// 		}

// 		transporter.sendMail(mailOptions, function(err, info) {
// 			if(err) {
// 				reject(err);
// 			}
// 			else {
// 				resolve(info);
// 			}
// 		})
// 	});
// }

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
