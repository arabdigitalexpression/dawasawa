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

// decryptCookie is a middleware function
module.exports.decryptAuth = (req, res, next) => {
	if(req.cookies.authenticated_human == undefined){
		res.sendStatus(401) // unauthorized request ( cookies.authenticated_human is not sent )
	} else {
		let binaryData = bs62.decode(req.cookies.authenticated_human)
		let base16Data = bs16.encode(binaryData)

		let authTag = bs16.decode(req.cookies.auth_tag)

		const decipher = crypto.createDecipher('aes-128-gcm', 'ctIXAq9o3E81JWguImTDajqzk69LmYpUXIcyY3l')
		let decrypted = ''


		decipher.setAuthTag(authTag)

		decipher.on('readable', () => {
		  const data = decipher.read()
		  if (data)
		    decrypted += data.toString('utf8')
		})

		decipher.on('end', () => {
			next()
		})

		decipher.on('error', (err) => {
			console.error(err)
			res.sendStatus(400)
		})

		decipher.write(base16Data, 'hex')
		decipher.end()
	}	
}



// decrypt is a middleware function
module.exports.decrypt = (req, res, next) => {
	if(req.params.token == undefined){
		res.sendStatus(404)
	} else {
		let binaryData = bs62.decode(req.params.token)
		let base16Data = bs16.encode(binaryData)
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
			console.error(err)
			res.sendStatus(400)
		})

		decipher.write(base16Data, 'hex')
		decipher.end()
	}	
}
