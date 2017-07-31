const express = require('express'),
	  async = require('async'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  config = require('../config/config')

let router = express.Router()

router.get('/:token', Encrypter.decrypt ,(req, res) => {
	console.log(req.token);
	let submitedDate = new Date(req.token.d)
	submitedDate = submitedDate.getTime()
	let date = new Date()

	let checkDate = new Date(
		date.setTime( date.getTime() )
	)

	if( ( checkDate.getTime() - submitedDate ) >= (config.LISTING_CHALLENGE_GRACE * 60 * 60 * 1000) )
	 	return res.status(403).send("انتهت صلاحية هذا التصريح. يمكنك إيداع طلب جديد لمطالعة إدراجاتك.")

	MedicineCtrl.findWithEmail(req.token.f).then((meds) => {
		return Token.generateAccessToken(meds, "DELETE")
	}).then((meds) => {
		async.each(meds, function(med, cb) {
			let expire_month = med.expiry_date.getMonth()
			let expire_year = med.expiry_date.getFullYear()
			med.expiry_date = expire_month + "-" + expire_year
			let submit_month = med.submission_date.getMonth()
			let submit_year = med.submission_date.getFullYear()
			med.submission_date = submit_month + "-" + submit_year
			cb()
		}, function() {
			res.send(meds)
		})
	}).catch((err) => {
		console.log(err)
		if(err.code == 404) {
			res.status(err.code).send(err.message)
		}
		res.status(500).send('Internal server error')
	})
})

module.exports = router

