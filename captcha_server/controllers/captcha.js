const Captcha = require('../data/schema')

module.exports.addCaptcha = (session_id, value) => {
	/*
	 * adds a new captcha to the user session
	 */
	return new Promise((resolve, reject) => {
		var cap = new Captcha();
		cap.value = value;
		cap.session_id = session_id;
		cap.save(function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	})
}

module.exports.findCaptcha = function(value, session_id) {
	return new Promise(function(resolve, reject) {
		Captcha.findOne({ value: value, session_id: session_id }, function(err, cap) {
			if(err) {
				reject(err);
			} else 
				resolve(cap);
		});
	});
}

module.exports.findSession = function(session_id) {
	return new Promise(function(resolve, reject) {
		Captcha.findOne({ session_id : session_id }, function(err, cap) {
			if(err) {
				reject(err);
			} else 
				resolve(cap);
		});
	});
}


