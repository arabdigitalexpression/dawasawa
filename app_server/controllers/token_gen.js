const async = require('async')

module.exports.generateToken = (field) => {
	/*
	 * generates json object called token 
	 * @param {String} field - can be any string Object_id, email_address, etc.
	 */
	return new Promise((resolve, reject) => {
		let token = {}
		if(field == undefined) {
			reject()
		} else {
			token.f =  field // field
			token.d =  new Date() // current date
			resolve(token)
		}
	})
}

module.exports.generateAccessToken = (meds, method) => {
	/* 
	 * @param {Array} meds - array of medicine
	 * generates remove links to allow users to remove their entries
	 */
	return new Promise((resolve, reject) => {

		async.each(meds, function(medicine, cb) {
			/*
			 * add a new field to the returned results
			 * [accessToken] - the new field 
			 * "m" : "the request method"
			 * "f" : medicine_id
			 * "d" : request date ( current date )
 			 */
 			medicine['accessToken'] = JSON.stringify({ "m": method ,"f": medicine._id, "d": new Date() }) 
 			Encrypter.encrypt(medicine.accessToken).then((encrypted) => {
 				medicine.accessToken = encrypted
 				return cb()
 			}).catch((err) => {
 				cb(err)
 			})
		}, function(err) {
			if(err)
				return reject(err)
			resolve(meds)
		})
	})
}








