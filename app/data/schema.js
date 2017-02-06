var mongoose = require('mongoose');
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

var tokenSchema = mongoose.Schema({
	value: {
		type: String,
		index: true
	},
	user_email: {
		type: String,
		required: true
	},
	expireAt: {
		type: Date,
		expires: '1h',
		default: Date.now
	}
});

var captchaSchema = mongoose.Schema({
	value: {
		type: String,
		index: true
	},
	session_id : {
		type: String
	},
	expireAt: {
		type: Date,
		expires: 120,
		default: Date.now
	}
});

var Item = mongoose.model('Item', itemSchema);
var Token = mongoose.model('Token', tokenSchema);
var Captcha = mongoose.model('Captcha', captchaSchema);
var Models = { Item: Item, Token: Token, Captcha: Captcha };

module.exports = Models;
