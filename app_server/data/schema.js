const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema;

const medicineSchema =  new Schema({
	latin_name: { type: String, required:  true, index: true},
	arabic_name: String,
	governorate: { type: String, required: true },
	submission_date: Date,
	expiry_date: { type: Date, required: true },
	package_state: { type: String, required: true },
	notes: String,
	pic_link: String,
	contact: {
		name: { type: String, required: true },
		email_address: { type: String, required: true, index: true },
		phone: String,
		email_invisible: { type: Boolean, default: false }
	},
	instated: { type: Boolean, default: false }
});


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
