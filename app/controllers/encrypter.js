var BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var BASE16 = '0123456789ABCDEF';

var BaseX = require('base-x-bytearray');

var bs62 = BaseX(BASE62);
var bs16 = BaseX(BASE16);

const crypto = require('crypto');

var app_config = require('../config/config');

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();

		const cipher = crypto.createCipher('id-aes128-GCM', app_config.token_secret_key);

		let encrypted = '';

		cipher.on('readable', () => {
			const data = cipher.read();
			if (data) {
				encrypted += bs16.encode(data);
			}
		});

		cipher.on('end', () => {
			console.log('1- base 16 : ' + encrypted);
			var a = bs16.decode(encrypted);
			console.log('2- base16 decoded : ' + a);
			var b = bs62.encode(a);
			console.log('3- base 62 : ' + b);	
			resolve(b);
		});
		
		cipher.write(value);
		cipher.end();
	})
}


module.exports.decrypt = (value) => {
	var c = bs62.decode(value);
	console.log('4- base62 decoded : ' + c);

	var d = bs16.encode(c);
	console.log('5- base 16 : ' + d);

	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();
		const decipher = crypto.createDecipher('id-aes128-GCM', app_config.token_secret_key);

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
