const crypto = require('crypto');

module.exports.encrypt = (value) => {
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();
		const cipher = crypto.createCipher('aes192', 'secret');

		let encrypted = '';

		cipher.on('readable', () => {
			const data = cipher.read();
			if (data)
				encrypted += data.toString('hex');
		});

		cipher.on('end', () => {
			resolve(encrypted);
		});
		
		cipher.write(value);
		cipher.end();
	})
}

module.exports.encryptSync = (value) => {

	const cipher = crypto.createCipher('aes192', 'secret');

	let encrypted = '';

	cipher.on('readable', () => {
		const data = cipher.read();
		if (data)
			encrypted += data.toString('hex');
	});

	cipher.on('end', () => {
		return encrypted;
	});
	
	cipher.write(value);
	cipher.end();
}

module.exports.decrypt = (value) => {
	console.log('to decript: ' + value);
	return new Promise ((resolve, reject) => {
		if(value == undefined)
			reject();
		const decipher = crypto.createDecipher('aes192', 'secret');

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






