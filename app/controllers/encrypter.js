const Config = require('../config/config')
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

		const cipher = crypto.createCipher(Config.encryption_cipher, Config.token_secret_key)

		let encrypted = ''

		cipher.on('readable', () => {
			const data = cipher.read()
			if (data) {
				encrypted += bs16.encode(data)
			}
		})

		cipher.on('end', () => {
			let binaryData = bs16.decode(encrypted)
			let base62Data = bs62.encode(binaryData)
			resolve(base62Data)
		})
		
		cipher.on('error', (err) => {
			res.sendStatus(500)
			console.error(err)
		})

		cipher.write(value)
		cipher.end()
	})
}

// decrypt is a middleware function
module.exports.decrypt = (req, res, next) => {
	let binaryData = bs62.decode(req.params.token)
	let base16Data = bs16.encode(binaryData)

	if(req.params.token == undefined){
		res.sendStatus(404)
	} else {
		const decipher = crypto.createDecipher(Config.encryption_cipher, Config.token_secret_key)
		let decrypted = ''
		decipher.on('readable', () => {
		  const data = decipher.read()
		  if (data)
		    decrypted += data.toString('utf8')
		})

		decipher.on('end', () => {
			let token = JSON.parse(decrypted)
			req.token = token
			console.log(req.token)
			next()
		})

		decipher.on('error', (err) => {
			res.sendStatus(400)
			console.error(err)
		})

		decipher.write(base16Data, 'hex')
		decipher.end()
	}
		
	
}
