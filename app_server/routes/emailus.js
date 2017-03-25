const express = require('express'),
	  Validator = require('../middleware/validator'),
	  CaptchaClient = require('../middleware/captcha_client')
	  EmailSender = require('../controllers/emailsender')

let router = express.Router();


router.post('/', Validator.validateContactSchema, function(req, res) {
	// send Email
	console.log(req.body)
	EmailSender.sendmail('/contact_email', req.body)
	res.sendStatus(200)
});

module.exports = router;