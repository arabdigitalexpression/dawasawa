const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  Validator = require('../middleware/validator'),
	  Token = require('../controllers/token_gen'),
	  Encrypter = require('../controllers/encrypter'),
	  CaptchaClient = require('../middleware/captcha_client')


let router = express.Router()

router.post('/', CaptchaClient.validateCaptcha, Validator.validateMedicineObject, (req, res) => {
	MedicineCtrl.add(req.body).then((med) => {
		return Token.generateToken(med._id)
	}).then((token) => {
		return Encrypter.encrypt(JSON.stringify(token))
	}).then((encrypted) => {
		// call email sender to send mail to user with the verification token
		res.send(encrypted)
	}).catch((err) => {
		console.log(err)
		res.status(500).send('Internal server error')
	})
})

module.exports = router