const config = require('./config/config')

const sendmail = require('sendmail') ({
	silent: true,
	dkim: {
    privateKey: config.DKIM_PRIVATE_KEY,
    keySelector: config.DKIM_KEY_SELECTOR
  }
})


// Sends token ladden email messages to confrm actions
module.exports.sendmail = function(fromAddress, toAddress, subject, data) {
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