var nodemailer = require('nodemailer');



	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: '',
			pass: ''
		}
	});



module.exports.sendEmail = function(email, data) {
	console.log('sending.....');
	return new Promise(function(resolve, reject) {
		var mailOptions = {
			from: '',
			to: email,
			subject: 'verify entry',
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
			to: '',
			subject: 'dawasawa contact',
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