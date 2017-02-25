const mongoose = require('mongoose')
const Config = require('../config/config')

mongoose.Promise = global.Promise 
const Schema = mongoose.Schema

var captchaSchema = mongoose.Schema({
	value: {
		type: String,
		index: true
	},
	session_id : {
		type: String,
		index: true
	},
	expireAt: {
		type: Date,
		expires: Config.captcha_expiration_period,
		default: Date.now
	}
})

const Captcha = mongoose.model('Captcha', captchaSchema)

module.exports = Captcha
