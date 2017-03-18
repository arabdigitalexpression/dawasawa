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

		console.log(Config.encryption_cipher)
		console.log(Config.token_secret_key)

		const cipher = crypto.createCipher('aes-128-gcm', 'ctIXAq9o3E81JWguImTDajqzk69LmYpUXIcyY3l')

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

			let authTag = cipher.getAuthTag()
			console.log(authTag)
			let encodedAuthTag = bs16.encode(authTag)

			let encryptedAuth = {}
			encryptedAuth.base62Data = base62Data
			encryptedAuth.encodedAuthTag = encodedAuthTag
			console.log(encryptedAuth)
			resolve(encryptedAuth)
		})
		
		cipher.on('error', (err) => {
			res.sendStatus(500)
			console.error(err)
		})

		cipher.write(value)
		cipher.end()
	})
}
