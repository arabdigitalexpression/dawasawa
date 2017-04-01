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
			token.d =  Date() // current date
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
		meds.forEach((medicine) => {
			/*
			 * add a new field to the returned results
			 * [accessToken] - the new field 
			 * "m" : "the request method"
			 * "f" : medicine_id
			 * "d" : request date ( current date )
 			 */
			medicine['accessToken'] = JSON.stringify({ "m": method ,"f": medicine._id, "d": Date() }) 
			Encrypter.encrypt(medicine.accessToken).then((encrypted) => {
				medicine.accessToken = encrypted
			}).catch((err) => {
				reject(err)
			})
		})
		setTimeout(function() {
			resolve(meds)
		}, 100)
		
	})
}








