const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter')

let router = express.Router()

router.get('/:token', Validator.validateToken, Encrypter.decrypt, (req, res) => {
	console.log('field : ' +  req.token.f)
	MedicineCtrl.removeMedicine(req.token.f).then(() => {
		res.send('removed')
	}).catch((err) => {
		res.status(500).send(err)
	})
})

module.exports = router









