var mongoose = require('mongoose');
var app_config = require('../config/config');

mongoose.Promise = global.Promise; 
var Schema = mongoose.Schema;

var itemSchema =  new Schema({
	_id: { type: String, required:  true, index: true},
	latin_name: { type: String, required:  true, index: true},
	arabic_name: String,
	governorate: { type: String, required: true },
	submission_date: Date,
	expire_date: { type: Date, required: true },
	package_state: { type: String, required: true },
	notes: String,
	pic_link: String,
	contact: {
		name: { type: String, required: true },
		email_address: { type: String, required: true, index: true },
		phone: String,
		email_invisible: { type: Boolean, default: false }
	},
	instated: { type: Boolean, default: false },
});

var Item = mongoose.model('Item', itemSchema);

module.exports(Item);