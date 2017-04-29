const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter'),
	  config = require('../config/config')

let router = express.Router()

router.get('/:token', Encrypter.decrypt, (req, res) => {

	if( req.token.m == "DELETE") {
		MedicineCtrl.removeMedicine(req.token.f).then(() => {
			return res.status(200).redirect(req.headers.referer)
		}).catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
	} else
		res.sendStatus(400)
})

module.exports = router









