var express = require('express');
var svgCaptcha = require('svg-captcha');
var Methods =  require('../data/methods');
var router = express.Router();

router.get('/', function(req, res) {
	var captcha = svgCaptcha.createMathExpr();
	Methods.addCaptcha(req.query.session_id, captcha.text).then(function() {
		res.set('Content-Type', 'image/svg');
    	res.status(200).send(captcha.data);
	}, function(err) {
		res.send('error getting captcha');
	});
});

module.exports = router;