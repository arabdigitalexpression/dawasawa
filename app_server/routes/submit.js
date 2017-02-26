const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  Validator = require('../middleware/validator'),
	  Token = require('../controllers/token_gen'),
	  Encrypter = require('../controllers/encrypter'),
	  CaptchaClient = require('../middleware/captcha_client'),
	  EmailSender = require('../controllers/emailsender')


let router = express.Router()
router.post('/', Validator.validateMedicineObject, (req, res) => {
//router.post('/', CaptchaClient.validateCaptcha, Validator.validateMedicineObject, (req, res) => {
	MedicineCtrl.add(req.body.medicine).then((med) => {
		console.log('added to database')
		return Token.generateToken(med._id)
	}).then((token) => {
		console.log('token generated')
		return Encrypter.encrypt(JSON.stringify(token))
	}).then((encrypted) => {
		console.log('token encrypted')
		// call email sender to send mail to user with the verification token
		req.body.encrypted = encrypted
		req.body.email_address = req.body.medicine.contact.email_address
		EmailSender.sendmail('/submit_email', req.body)
		res.send(encrypted)
	}).catch((err) => {
		console.log(err)
		res.status(500).send('Internal server error')
	})
})

module.exports = router