const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter')

let router = express.Router()

router.get('/:token', Validator.validateToken , Encrypter.decrypt ,(req, res) => {
	MedicineCtrl.findWithEmail(req.token.f).then((meds) => {
		return Token.generateAccessToken(meds, "DELETE")
	}).then((meds) => {
		meds.forEach((med)=> {
			let expire_month = med.expiry_date.getMonth() 
			let expire_year = med.expiry_date.getFullYear()
			med.expiry_date = expire_month + "-" + expire_year

			let submit_month = med.submission_date.getMonth()
			let submit_year = med.submission_date.getFullYear()
			med.submission_date = submit_month + "-" + submit_year
		})
		setTimeout(()=> {
			res.send(meds)
		}, 1000)
	}).catch((err) => {
		console.log(err)
		if(err.code == 404) {
			res.status(err.code).send(err.message)
		}
		res.status(500).send('Internal server error')
	})
})

module.exports = router









