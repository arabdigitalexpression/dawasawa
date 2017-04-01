const Captcha = require('../data/schema')

module.exports.removeCaptcha = (session_id) => {
	/*
	 * removes an existing captcha that is related to the session
	 */

	return new Promise((resolve, reject) => {
		Captcha.remove({ session_id }, (err) => {
			reject(err)
		})
		resolve()
	})
}

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
			} else if(cap == null) {
				reject('cap not found');
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


