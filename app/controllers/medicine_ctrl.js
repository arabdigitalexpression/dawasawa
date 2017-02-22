const Medicine = require('../data/schema')

module.exports.findAll = () => {
	/*
	 * returns all the entries from the database ( This medthod will not be used in the app. )
	 */
	return new Promise(function(resolve, reject) {
		Medicine.find(function(err, meds) {
			if(err)
				reject(err)
			else
				resolve(meds)
		})
	})
}

module.exports.findWithId = (_id) => {
	/*
	 * returns the entry that matches the submitted id
	 * @param {String} _id - Object_id
	 */
	return new Promise(function(resolve, reject) {
		Medicine.find({ _id }, function(err, meds) {
			if(err)
				reject(err)
			else
				resolve(meds)
		})
	})
}

module.exports.findWithEmail = (email_address) => {
	/*
	 * returns the entry that matches the submitted email_address ( Listing )
	 * @param {String} email_address - the user's email address
	 */
	return new Promise(function(resolve, reject) {
		var query = Item.find({
		    'contact.email_address': email_address,
		    instated: true
		})

		query.exec(function(err, meds) {
			if(err)
				reject(err)
			else
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
	name = name.toLowerCase()
	return new Promise(function(resolve, reject) {
		if (gov === "كلّ المحافظات") {
			Medicine.find({ "latin_name": name, "instated": true }, function(err, items) {
				if(err)
					reject(err)
				else {
					resolve(items)
				}
			})
		} else {
			Medicine.find({ "latin_name": name, "governorate": gov, "instated": true }, function(err, items) {
				if(err)
					reject(err)
				else {
					resolve(items)
				}
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
	return new Promise(function(resolve, reject) {
		var med = new Medicine()
		med.latin_name = medicine.latin_name
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
		if( medicine.contact.email_visible != undefined )
			med.contact.email_visible = medicine.contact.email_visible
		if( medicine.contact.phone != undefined)
			med.contact.phone = medicine.contact.phone

		med.save(function(err, med) {
			if(err) {
				reject(err)
			}
			else
				resolve(med)
		})
	})
}

module.exports.instate = (medicine) => {
	/*
	 * update existing entry ( instate )
	 * @param {Object} medicine - medicine object
	 */
	medicine.instated = true
	medicine.save(function(err) {
			if(err) {
				reject(err)
			}
			else
				resolve()
		})
}

module.exports.removeMedicine = (_id) => {
	/*
	 * delete an entry
	 * @param {String} _id - Object_id
	 */
	return new Promise(function(resolve, reject) {
		medicine.remove({ _id }, function(err) {
			if(err)
				reject(err)
			else
				resolve()
		})
	})
}


















