const config = require('../config/config')
const BaseX = require('base-x-bytearray')
const crypto = require('crypto')

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE16 = '0123456789ABCDEF'

let bs62 = BaseX(BASE62)
let bs16 = BaseX(BASE16)

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject()
		let cipher = crypto.createCipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
		let crypted = cipher.update(value,'utf8','hex')
		crypted += cipher.final('hex')
		resolve(crypted)
	})
}

module.exports.decryptAuth = (req, res, next) => {
	if(req.cookies.authenticated_human == undefined){
		return res.sendStatus(401) // unauthorized request ( cookies.authenticated_human is not sent )
	} else {
		let decipher = crypto.createDecipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
		var dec = decipher.update(req.cookies.authenticated_human,'hex','utf8')
		dec += decipher.final('utf8')
		req.decryptedAuth = JSON.parse(dec)
		return next()
	}
}


// decrypt is a middleware function
module.exports.decrypt = (req, res, next) => {
	if(req.params.token === undefined){
		return res.sendStatus(404)
	} else {
		let decipher = crypto.createDecipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
		var dec = decipher.update(req.params.token,'hex','utf8')
		dec += decipher.final('utf8')
		req.token = JSON.parse(dec)
		next()
	}	
}
