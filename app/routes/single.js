var express = require('express');
var Methods =  require('../data/methods');
var static_data = require('../data/static_data');


var governorates = static_data.governorates;

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


function renderSingle (req, res) {
	res.render('./single', {
		governorates: governorates, 
		result: req.item,
		searched_term: '',
		searched_gov: ''
	});
}
function findOneResult (req, res, next) {
	 Methods.findWithId(req.params.id).then(function(item){
		var mydate = new Date(item.expire_date);
		var m = mydate.getMonth() + 1;
		var y = mydate.getFullYear();
		item.expire_month = m;
		item.expire_year = y;
		req.item = item;
		return next();
	}, function(err) {
		res.status(500);
	});
}

router.get('/:id', findOneResult, renderSingle);

router.post('/contact', ensureCaptcha, function(req, res) {
	Methods.findWithId(req.body.medicine_id).then(function(item) {
		res.send(item);
	}).catch(function(err) {
		res.status(500);
	});
});









module.exports = router;