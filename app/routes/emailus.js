var express = require('express');
var Methods =  require('../data/methods');
var Emailsender = require('../controllers/emailsender');

var router = express.Router();

function ensureCaptcha(req, res, next) {
	console.log('captcha entered : ' +  req.body.captcha_data);
	Methods.findCaptcha(req.body.captcha_data).then(function(cap) {
		if(cap != null) {
			if(req.body.session_id == cap.session_id) {
				next();
			} else {
				console.log('captcha not found');
				res.sendStatus(404);
			}
		} else {
			console.log('captcha not found');
			res.sendStatus(404);
		}
	}, function(err) {
		console.log(err);
		res.sendStatus(500);
	});
}

// render the home page
router.get('/', function(req, res) {
	console.log(req);
	res.render('emailus');
});

router.post('/', ensureCaptcha, function(req, res) {
	
	Emailsender.receiveEmail(req.body).then(function() {
		console.log('email sent');
		res.sendStatus(200);
	}).catch(function(err) {
		console.log(err);
		res.sendStatus(500);
	});
});

module.exports = router;