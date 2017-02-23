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

module.exports.generateRemoveToken = (meds) => {
	/* 
	 * @param {Array} meds - array of medicine
	 * generates remove links to allow users to remove their entries
	 */
	return new Promise((resolve, reject) => {
		meds.forEach((medicine) => {
			medicine['removeToken'] = JSON.stringify({ "f": medicine._id, "d": Date() }) // f: token field, d: token date
			Encrypter.encrypt(medicine.removeToken).then((encrypted) => {
				medicine.removeToken = encrypted
			}).catch((err) => {
				reject(err)
			})
		})
		setTimeout(function() {
			resolve(meds)
		}, 1000)
		
	})
}