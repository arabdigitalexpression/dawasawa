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

