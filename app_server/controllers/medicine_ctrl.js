const Medicine = require('../data/schema')

module.exports.findAll = () => {
	/*
	 * returns all the entries from the database ( This medthod will not be used in the app. )
	 */
	return new Promise((resolve, reject) => {
		Medicine.find((err, meds) => {
			if(err)
				reject(err)
			resolve(meds)
		})
	})
}

module.exports.findWithId = (_id) => {
	/*
	 * returns the entry that matches the submitted id
	 * @param {String} _id - Object_id
	 */
	return new Promise((resolve, reject) => {
		Medicine.find({ _id }, (err, med) => {
			if(err)
				reject(err)
			resolve(med)
		})
	})
}

module.exports.findWithEmail = (email_address) => {
	/*
	 * returns the entry that matches the submitted email_address ( Listing )
	 * @param {String} email_address - the user's email address
	 */
	return new Promise((resolve, reject) => {
		var query = Medicine.find({
		    'contact.email_address': email_address,
		    instated: true
		}).lean()

		query.exec((err, meds) => {
			if(err){
				reject(err)
			}
			if(meds.length == 0) {
				reject({
					"code": "404",
					"message" : "This Email has no entries or entries that are not verified"
				})
			}
			resolve(meds)
		})
	})
}

module.exports.filter = (name, gov) => {
	/*
	 * returns the entry that matches the name and governorate ( Search )
	 * @param {String} name - the medicine name
	 * @param {String} gov - the medicine governorate
	 */
	name = name.toLowerCase() // convert all letters to lowercase before search
	return new Promise((resolve, reject) => {
		// the user didn't enter a specific governorate
		if (gov === "كلّ المحافظات" || gov == undefined) {
			// the query select the all matched results except contact info.
			let query = Medicine.find({ "latin_name": name, "instated": true }).select('-contact').lean()
			query.exec((err, meds) => {
				if(err) {
					reject(err)
				}
				if(meds.length == 0) {
					reject({
						"code": "404",
						"message" : "No Results found"
					})
				}
				resolve(meds)
			})
		} else {
			// the query select the all matched results except contact info.
			let query = Medicine.find({ "latin_name": name, "governorate": gov, "instated": true }).select('-contact').lean()
			query.exec((err, meds) => {
				if(err) {
					reject(err)
				}
				if(meds.length == 0) {
					reject({
						"code": "404",
						"message" : "No Results found"
					})
				}
				resolve(meds)
			})
		}
	})
}


module.exports.add = (medicine) => {
	/*
	 * add new entry ( submit )
	 * @param {Object} medicine - medicine object
	 */
	var now = Date()
	return new Promise((resolve, reject) => {
		// create a new object and save this object
		var med = new Medicine()
		med.latin_name = medicine.latin_name.toLowerCase() // convert all letters to lowercase befor save
		med.governorate = medicine.governorate
		med.submission_date = now
		med.expiry_date = medicine.expiry_date
		med.package_state = medicine.package_state
		if(medicine.arabic_name != undefined)
			med.arabic_name = medicine.arabic_name
		if(medicine.notes != undefined)
			med.notes = medicine.notes
		med.contact.name = medicine.contact.name
		med.contact.email_address = medicine.contact.email_address
		if( medicine.contact.email_invisible != undefined )
			med.contact.email_invisible = medicine.contact.email_invisible
		if( medicine.contact.phone != undefined)
			med.contact.phone = medicine.contact.phone

		med.save((err, med) => {
			if(err)
				reject(err)
			resolve(med)
		})
	})
}

module.exports.instate = (_id) => {
	/*
	 * update existing entry ( instate )
	 * @param {String} _id - medicine Object_id
	 */
	return new Promise((resolve, reject) => {
		// find the matched object and update
		Medicine.findOneAndUpdate({ _id }, { $set: { instated: true } }, { new: true }, (err, med) => {
			if(err)
		 		reject(err)
	 		if( med == null) {
	 			reject({
	 				"code" : "404",
	 				"message" : "This medicine is deleted by you"
	 			})
	 		}
	 		resolve(med)
		})
	})
}

module.exports.removeMedicine = (_id) => {
	/*
	 * delete an entry
	 * @param {String} _id - Object_id
	 */
	return new Promise((resolve, reject) => {
		Medicine.findOneAndRemove({ _id }, (err) => {
			if(err)
				reject(err)
			resolve()
		})
	})
}


















