const express = require('express'),
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  Config = require('../config/config'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')


let router = express.Router()


router.get('/:token', Validator.validateToken , Encrypter.decrypt ,(req, res) => {
	
	//res.sendStatus(200)

	MedicineCtrl.instate(req.token.f).then((med) => {
		res.status(200).redirect('/verified')
	}).catch((err) => {
		console.log(err)
		res.status(500).send('Internal server error')
	})
})

module.exports = router
















