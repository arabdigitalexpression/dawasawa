var fs = require('fs');
// var nodemailer = require('nodemailer');

// load the config file
var app_config = require('../config/config');

// var transporter = nodemailer.createTransport({
// 		service: 'Gmail',
// 		auth: {
// 			user: app_config_address_form,
// 			pass: 'gundour1234'
// 		}
// 	});

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
// 				console.log(err);
// 				reject(err);
// 			}
// 			else {
// 				console.log(info);
// 				resolve();
// 			}
// 		})
// 	});
// }

// module.exports.receiveEmail = function(body) {
// 	return new Promise(function(resolve, reject) {
// 		var mailOptions = {
// 			from: app_config.email_address_writeus,
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
// 				console.log(info);
// 				resolve();
// 			}
// 		})
// 	});
// }



// // #######################################
// // ## Send Mail Production Email Sender ##
// // #######################################

var sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: ``,
    keySelector: ''
  }
})



// // production sendEmail
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

// // production receiveEmail
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
