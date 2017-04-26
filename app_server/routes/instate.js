const express = require('express'),
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  config = require('../config/config'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')


let router = express.Router()


router.get('/:token', Encrypter.decrypt ,(req, res) => {
	console.log(req.token)
	let submitedDate = new Date(req.token.d)
	submitedDate = submitedDate.getTime()
	let date = new Date()

	let checkDate = new Date(
		date.setTime( date.getTime() )
	)

	if( ( checkDate.getTime() - submitedDate ) >= (config.INSERTION_CHALLENGE_GRACE * 60 * 60 * 1000) )
	 	return res.status(403).send("انتهت صلاحية طلب الإيداع هذا و&nbsp;يمكن توكيده.")

	MedicineCtrl.instate(req.token.f).then((med) => {
		res.sendStatus(200)
	}).catch((err) => {
		console.log(err)
		res.status(500).send('Internal server error')
	})
})

module.exports = router
















