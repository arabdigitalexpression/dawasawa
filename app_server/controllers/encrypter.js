const config = require('../config/config')
const BaseX = require('base-x-bytearray')
const crypto = require('crypto')

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE16 = '0123456789abcdef'

let bs62 = BaseX(BASE62)
let bs16 = BaseX(BASE16)

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			return reject()
		let cipher = crypto.createCipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
		let crypted = cipher.update(value,'utf8','hex')
		crypted += cipher.final('hex')
		let binaryData = bs16.decode(crypted)
		let base62Data = bs62.encode(binaryData)
		resolve(base62Data)
	})
}

module.exports.decryptAuth = (req, res, next) => {
	if(req.cookies.authenticated_human == undefined){
		return res.sendStatus(401) // unauthorized request ( cookies.authenticated_human is not sent )
	} else {
		try {
			let decipher = crypto.createDecipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
			let binaryData = bs62.decode(req.cookies.authenticated_human)
			let base16Data = bs16.encode(binaryData)
			var dec = decipher.update(base16Data,'hex','utf8')
			dec += decipher.final('utf8')
			req.decryptedAuth = JSON.parse(dec)
		} catch(err) {
			if(err){
				console.log(err)
				return res.redirect('/error')
			}
		}
		next()
	}
}


// decrypt is a middleware function
module.exports.decrypt = (req, res, next) => {
	if(req.params.token === undefined){
		return res.sendStatus(404)
	} else {
		try {
			let decipher = crypto.createDecipher(config.ENCRYPTION_TYPE,config.ENCRYPTION_SECRET)
			let binaryData = bs62.decode(req.params.token)
			let base16Data = bs16.encode(binaryData)
			var dec = decipher.update(base16Data,'hex','utf8')
			dec += decipher.final('utf8')
			req.token = JSON.parse(dec)
		} catch(err) {
			if(err){
				console.log(err)
				return res.redirect('/error')
			}
		}
		next()
	}	
}
