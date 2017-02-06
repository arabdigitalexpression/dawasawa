var express = require('express');
var Methods =  require('../data/methods');
var Emailsender = require('../controllers/emailsender');

var router = express.Router();

function ensureCaptcha(req, res, next) {
	Methods.findCaptcha(req.body.captcha_data).then(function(cap) {

		if(cap != null) {
			if(req.body.session_id == cap.session_id) {
				next();
			} else {
				res.sendStatus(404);
			}
		} else {
			res.sendStatus(404);
		}
	}, function(err) {
		res.sendStatus(500);
	});
}

// render the home page
router.get('/', function(req, res) {
	res.render('emailus');
});

router.post('/', ensureCaptcha, function(req, res) {
	
	Emailsender.receiveEmail(req.body).then(function(info) {
		res.sendStatus(200);
	}).catch(function(err) {
		console.log(err);
		res.sendStatus(500);
	});
});

module.exports = router;