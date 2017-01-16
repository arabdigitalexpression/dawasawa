/******************************************************************************/
/************************* The  Controller Functions ****************************/
/****************************************************************************/

var Item = require('../models/methods');
var nodemailer = require('nodemailer');
require('../config/secrets.js');

/* 1- Send mail */
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: username,
		pass: password
	}
});

module.exports.sendEmail = function(email, data) {
	return new Promise(function(resolve, reject) {
		var mailOptions = {
			from: 'gundourtest@gmail.com',
			to: email,
			subject: 'Website test',
			text: 'You have a new data : ' + data
		}

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				reject(err);
				console.log(err);
			}
			else {
				resolve(info);
				console.log(info);
			}
		})
	});
}

