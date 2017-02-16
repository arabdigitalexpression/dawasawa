const crypto = require('crypto');

var app_config = require('../config/config');

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();

		const cipher = crypto.createCipher('aes192', app_config.token_secret_key);

		let encrypted = '';

		cipher.on('readable', () => {
			const data = cipher.read();
			if (data) {
				encrypted += data.toString('hex');
			}
		});

		cipher.on('end', () => {
			resolve(encrypted);	
		});
		
		cipher.write(value);
		cipher.end();
	})
}


module.exports.decrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();
		const decipher = crypto.createDecipher('aes192', app_config.token_secret_key);

		let decrypted = '';
		decipher.on('readable', () => {
		  const data = decipher.read();
		  if (data)
		    decrypted += data.toString('utf8');
		});

		decipher.on('end', () => {
			resolve(decrypted);
		});

		decipher.write(value, 'hex');
		decipher.end();
	})
}






