const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  Validator = require('../middleware/validator'),
	  Token = require('../controllers/token_gen'),
	  Encrypter = require('../controllers/encrypter'),
	  EmailSender = require('../controllers/emailsender')

let router = express.Router()

/*
 * Submit Route
 * ### listens to post request ###
 *
 * Middleware
 *	1- decryptAuth() : decripts authentication cookies, ensure that the sender is human
 *	2- validateMedicineObject() : validate request body before saving entries to the database 
 */

router.post('/', Encrypter.decryptAuth, Validator.validateMedicineObject ,(req, res) => {
	MedicineCtrl.add(req.body).then((med) => {
		// the request body is saved to database
		console.log('added to database')
		return Token.generateToken(med._id)
	}).then((token) => {
		// the medicine instatement is generated
		console.log('token generated')
		return Encrypter.encrypt(JSON.stringify(token))
	}).then((encrypted) => {
		// the medicine instatement is encrypted
		console.log('token encrypted')

		req.body.encrypted = encrypted
		req.body.email_address = req.body.contact.email_address
		// call email sender to send mail to user with the verification token
		EmailSender.sendmail('/submit_email', req.body)
		res.sendStatus(200)
	}).catch((err) => {
		// an error is found
		console.log(err)
		res.status(500).send('Internal server error')
	})
})
module.exports = router