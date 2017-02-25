const express = require('express'),
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  Config = require('../config/config'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')


let router = express.Router()


router.get('/:token', Validator.validateToken , Encrypter.decrypt ,(req, res) => {
	
	MedicineCtrl.instate(req.token.f).then((med) => {
		res.send(med)
	}).catch((err) => {
		console.log(err)
		res.status(500).send('Internal server error')
	})
})

module.exports = router
















