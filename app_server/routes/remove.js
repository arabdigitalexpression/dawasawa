const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  config = require('../config/config')

let router = express.Router()

router.get('/:token', Encrypter.decrypt, (req, res) => {

	if( req.token.m == "DELETE") {
		MedicineCtrl.removeMedicine(req.token.f).then(() => {
			res.sendStatus(200)
		}).catch((err) => {
			console.log(err)
			res.status(500).send(err)
		})
	} else
		res.sendStatus(400)
})

module.exports = router









