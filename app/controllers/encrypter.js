const app_config = require('../config/config');
const BaseX = require('base-x-bytearray');
const crypto = require('crypto');

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE16 = '0123456789ABCDEF';

var bs62 = BaseX(BASE62);
var bs16 = BaseX(BASE16);

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();

		const cipher = crypto.createCipher(app_config.encryption_cipher, app_config.token_secret_key);

		let encrypted = '';

		cipher.on('readable', () => {
			const data = cipher.read();
			if (data) {
				encrypted += bs16.encode(data);
			}
		});

		cipher.on('end', () => {
			var a = bs16.decode(encrypted);
			var b = bs62.encode(a);
			resolve(b);
		});
		
		cipher.write(value);
		cipher.end();
	})
}


module.exports.decrypt = (value) => {
	var c = bs62.decode(value);
	var d = bs16.encode(c);

	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();
		const decipher = crypto.createDecipher(app_config.encryption_cipher, app_config.token_secret_key);

		let decrypted = '';
		decipher.on('readable', () => {
		  const data = decipher.read();
		  if (data)
		    decrypted += data.toString('utf8');
		});

		decipher.on('end', () => {
			resolve(decrypted);
		});

		decipher.write(d, 'hex');
		decipher.end();
	})
}
