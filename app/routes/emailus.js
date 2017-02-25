const express = require('express'),
	  Validator = require('../middleware/validator'),
	  CaptchaClient = require('../middleware/captcha_client')

let router = express.Router();


router.post('/', CaptchaClient.validateCaptcha ,Validator.validateContactSchema, function(req, res) {
	// send Email
});

module.exports = router;