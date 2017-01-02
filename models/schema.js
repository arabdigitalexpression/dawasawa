var mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
var Schema = mongoose.Schema;

var itemSchema =  new Schema({
	latin_name: { type: String, required:  true, index: true},
	arabic_name: String,
	governorate: { type: String, required: true },
	submission_date: Date,
	expire_date: { type: Date, required: true },
	package_state: { type: String, required: true },
	description: String,
	pic_link: String,
	contact: {
		name: { type: String, required: true },
		email_address: { type: String, required: true, index: true },
		phone_number: String
	},
	instated: { type: Boolean, default: false },
	archive: { type: Boolean, default: false },
	token: {
		type: Schema.Types.ObjectId,
		ref: 'Token',
		default: null
	}
});

var tokenSchema = mongoose.Schema({
	value: { 
		type: String,
		index: true
	},
	item: {
		type: Schema.Types.ObjectId,
		ref: 'Item'
	},
	expireAt: {
		type: Date,
		expires: 60,
		default: Date.now
	}
});

var Item = mongoose.model('Item', itemSchema);
var Token = mongoose.model('Token', tokenSchema);
var Models = { Item: Item, Token: Token };

module.exports = Models;
