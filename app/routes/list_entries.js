var express = require('express');
var Methods =  require('../data/methods');
var Emailsender = require('../controllers/emailsender');

// load the config file
var app_config = require('../config/config');
var app_url;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
	app_url = app_config.development.url;
} else if (process.env.NODE_ENV == 'production') {
	app_url = app_config.production.url;
}

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

// render the home page
router.get('/', function(req, res) {
	res.render('list_entries');
});

router.post('/',ensureCaptcha, function(req, res) {
	Methods.findWithEmail(req.body.user_email).then(function(items) {
		if(items.length != 0) {
			return Methods.generateTokens(req.body.user_email);
		}
	}).then(function(token) {
		if(token != undefined) {
			status = 200;
			var email_data = {
				html :  '<div align="right">'
						+'أهلا!'
						+ '<p align="right"> <span style="float: right"> شخص ما قد طلب معاينة قائمة الإدراجات المرتبكة بعنوان البريد هذا في </span> <span> dawasawa.online</span> </p>'
						+ '<p align="right">لمعاينة إدراجاتك اتبع الرابط التالي، وإلا فتجاهل هذه الرّسالة.</p>'
						+ app_url + '/mylist/' + token.value
						+ '</div>'
			}
			return Emailsender.sendEmail(req.body.user_email, 'Listing request', email_data);
		} else {
			status = 404;
		}
	}).then(function() {
		if(status == 200) {
			res.sendStatus(200);
		} else if (status == 404) {
			res.sendStatus(404);
		} else {
			res.sendStatus(500);
		}
	})
	.catch(function(err) {
		if(err) {
			res.sendStatus(500);
			console.log(err);
		} 
	});
	
});


module.exports = router;