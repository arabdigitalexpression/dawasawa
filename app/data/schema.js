var mongoose = require('mongoose');
var app_config = require('../config/config');

mongoose.Promise = global.Promise; 
var Schema = mongoose.Schema;

var medicineSchema =  new Schema({
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
		email_visible: { type: Boolean, default: true }
	},
	instated: { type: Boolean, default: false },
});

// var captchaSchema = mongoose.Schema({
// 	value: {
// 		type: String,
// 		index: true
// 	},
// 	session_id : {
// 		type: String
// 	},
// 	expireAt: {
// 		type: Date,
// 		expires: 120,
// 		default: Date.now
// 	}
// });

var Medicine = mongoose.model('Medicine', medicineSchema);
// var Captcha = mongoose.model('Captcha', captchaSchema);
// var Models = { Medicine: Medicine, Captcha: Captcha };

module.exports = Medicine;
