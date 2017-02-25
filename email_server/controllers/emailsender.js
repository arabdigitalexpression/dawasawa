const sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: ``,
    keySelector: ''
  }
})


// Sends token ladden email messages to confrm actions
module.exports.sendEmail = function(fromAddress, toAddress, subject, data) {
	return new Promise(function(resolve, reject) {
		sendmail({
			from: fromAddress,
			to: toAddress,
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