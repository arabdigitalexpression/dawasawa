const mongoose = require('mongoose')
const config = require('../config/config')

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
		expires: config.captcha_expiration_period,
		default: Date.now
	}
})

const Captcha = mongoose.model('Captcha', captchaSchema)

module.exports = Captcha
