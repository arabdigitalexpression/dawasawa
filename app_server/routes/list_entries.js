const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Token = require('../controllers/token_gen'),
	  Encrypter = require('../controllers/encrypter'),
	  CaptchaClient = require('../middleware/captcha_client'),
	  EmailSender = require('../controllers/emailsender')


let router = express.Router()
router.post('/', Validator.validateEmail ,(req, res) => {
//router.post('/', CaptchaClient.validateCaptcha, Validator.validateEmail ,(req, res) => {
	console.log('validated')
	MedicineCtrl.findWithEmail(req.body.email_address).then((meds) => {
		if(meds.length > 0) {
			return Token.generateToken(req.body.email_address)
		}
	}).then((token) => {
		return Encrypter.encrypt(JSON.stringify(token))
	}).then((encrypted) => {
		// call email sender to send mail to user with the listing token
		req.body.encrypted = encrypted
		EmailSender.sendmail('/listing_email', req.body)
		res.send(encrypted)
	}).catch((err) => {
		console.log(err)
		if(err.code == 404) {
			res.status(err.code).send(err.message)
		}
		res.status(500).send('Internal server error')
	})
})


module.exports = router




























