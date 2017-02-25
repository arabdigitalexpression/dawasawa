// const express = require('express');
// const Methods =  require('../data/methods');
// const Emailsender = require('../controllers/emailsender');
// const Encrypter = require('../controllers/encrypter');
// const app_config = require('../config/config');

// var app_url = app_config.site_url;

// var status;

// var router = express.Router();


// function ensureCaptcha(req, res, next) {
// 	Methods.findCaptcha(req.body.captcha_data).then(function(cap) {

// 		if(cap != null) {
// 			if(req.body.session_id == cap.session_id) {
// 				next();
// 			} else {
// 				res.sendStatus(404);
// 			}
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	}, function(err) {
// 		res.sendStatus(500);
// 	});
// }

// function ensureEntries(req, res, next) {
// 	Methods.findWithEmail(req.body.user_email).then(function(items) {
// 		if(items.length != 0) {
// 			return next();
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	}).catch(function(err) {
// 		res.sendStatus(500);
// 	});
// }

// // render the home page
// router.get('/', function(req, res) {
// 	res.render('list_entries');
// });



// router.post('/',ensureCaptcha, ensureEntries, function(req, res) {
// 	var params = {
// 		email: req.body.user_email,
// 		submission_date: Date()
// 	};

// 	Encrypter.encrypt( JSON.stringify(params) ).then(function(encrypted) {
// 		var email_data = {
// 			html :  '<div align="right">'
// 					+'أهلا!'
// 					+ '<p align="right"><span style="float: right"> شخص ما قد طلب معاينة قائمة الإدراجات المرتبطة بعنوان البريد هذا في </span><span> dawasawa.online</span></p>'
// 					+ '<p align="right">تمكنك معاينة إدراجاتك باتّباع الرابط التالي في غضون ' + config.listings_challenge_grace + ' ساعة، وإلا فتجاهل هذه الرّسالة.</p>'
// 					+ '<a href="' + app_url + '/mylist/' + encrypted + '">' + app_url + '/mylist/' + encrypted + '</a>'
// 					+ '</div>'
// 			}
// 		return Emailsender.sendEmail(req.body.user_email, 'دواسوا: قائمة إدراجات', email_data);
// 	}).then(function() {
// 		res.sendStatus(200);
// 	}).catch(function(err) {
// 		res.sendStatus(500);
// 	});
// });



// module.exports = router;

const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Token = require('../controllers/token_gen'),
	  Encrypter = require('../controllers/encrypter'),
	  CaptchaClient = require('../middleware/captcha_client')


let router = express.Router()

router.post('/', CaptchaClient.validateCaptcha, Validator.validateEmail ,(req, res) => {
	console.log('validated')
	MedicineCtrl.findWithEmail(req.body.email_address).then((meds) => {
		if(meds.length > 0) {
			return Token.generateToken(req.body.email_address)
		}
	}).then((token) => {
		return Encrypter.encrypt(JSON.stringify(token))
	}).then((encrypted) => {
		// call email sender to send mail to user with the listing token
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




























