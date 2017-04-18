const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')

let router = express.Router()

router.get('/:token', Encrypter.decryptAuth, Encrypter.decrypt, (req, res)=> {

	MedicineCtrl.findWithId(req.token.f).then((med)=> {

		let expire_month = med.expiry_date.getMonth() 
		let expire_year = med.expiry_date.getFullYear()
		med.expiry_date = expire_month + "-" + expire_year

		res.send(med)
		
	}).catch((err)=> {
		res.sendStatus(500)
	})
})

module.exports = router