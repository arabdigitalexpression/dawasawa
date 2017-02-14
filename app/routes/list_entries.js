var express = require('express');
var Methods =  require('../data/methods');
var Emailsender = require('../controllers/emailsender');
var Encrypter = require('../controllers/encrypter');

// load the config file
var app_config = require('../config/config');
var app_url = app_config.site_url;

var status;

var router = express.Router();


function ensureCaptcha(req, res, next) {
	Methods.findCaptcha(req.body.captcha_data).then(function(cap) {

		if(cap != null) {
			if(req.body.session_id == cap.session_id) {
				next();
			} else {
				res.status(404).send('renew captcha');
			}
		} else {
			res.status(404).send('renew captcha');
		}
	}, function(err) {
		res.sendStatus(500);
	});
}

function ensureEntries(req, res, next) {
	Methods.findWithEmail(req.body.user_email).then(function(items) {
		if(items.length != 0) {
			return next();
		} else {
			res.sendStatus(404);
		}
	}).catch(function(err) {	
		res.sendStatus(500);
	});
}

// render the home page
router.get('/', function(req, res) {
	res.render('list_entries');
});



router.post('/',ensureCaptcha, ensureEntries, function(req, res) {
	var params = {
		email: req.body.user_email,
		submission_date: Date()
	};

	Encrypter.encrypt( JSON.stringify(params) ).then(function(encrypted) {
		var email_data = {
			html :  '<div align="right">'
					+'أهلا!'
					+ '<p align="right"> <span style="float: right"> شخص ما قد طلب معاينة قائمة الإدراجات المرتبكة بعنوان البريد هذا في </span> <span> dawasawa.online</span> </p>'
					+ '<p align="right">لمعاينة إدراجاتك اتبع الرابط التالي، وإلا فتجاهل هذه الرّسالة.</p>'
					+ app_url + '/mylist/' + encrypted
					+ '</div>'
			}
		return Emailsender.sendEmail(req.body.user_email, 'Listing request', email_data);
	}).then(function() {
		res.sendStatus(200);
	}).catch(function(err) {
		res.sendStatus(500);
	});
});



module.exports = router;