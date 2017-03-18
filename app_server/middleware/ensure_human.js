const Encrypter = require('../controllers/encrypter')

module.exports.ensure = function(req, res, next) {
	let cookie = req.cookies.authenticated_human
	console.log(cookie)
	if(cookie === undefined) {
		res.sendStatus(401)
	} else {
		Encrypter.decryptData(cookie).then((auth) => {
			console.log(auth)
			next()
		}).catch((err)=> {
			console.log(err)
			res.sendStatus(500)
		})
	}
}

