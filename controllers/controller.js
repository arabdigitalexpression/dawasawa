/******************************************************************************/
/************************* The  Controller Functions ****************************/
/****************************************************************************/

var Item = require('../models/methods');
var nodemailer = require('nodemailer');

/* 1- Send mail */
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'gundourtesting@gmail.com',
		pass: 'gundour1234'
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

