var express = require('express');
var router = express.Router();
var Methods =  require('../data/methods');


router.get('/', function(req, res) {
	res.sendStatus(404);
});
// render the home page
router.get('/:token', function(req, res) {
	Methods.findEmailWithToken(req.params.token).then(function(token) {
		if(token.length != 0){
			return Methods.findWithEmail(token[0].user_email);
		} else {
			return res.sendStatus(404);
		}
	}).then(function(items) {
		if(items.length != 0) {
			items.forEach((item) => {
				var expireDate = new Date(item.expire_date);
				var submissionDate = new Date(item.submission_date);
				var e_m = expireDate.getMonth() + 1;
				var e_y = expireDate.getFullYear();
				var s_m = submissionDate.getMonth() + 1;
				var s_y = submissionDate.getFullYear();
				item.expire_month = e_m;
				item.expire_year = e_y;
				item.submission_month = s_m;
				item.submission_year = s_y;
			});
			res.render('mylist', {
				results: items 
			});
		} else {
			res.sendStatus(404);
		}
		
	 }).catch(function(err) {
		res.sendStatus(500);
	});
});



router.post('/delete', function(req, res) {
	Methods.removeItem(req.body.id).then(function() {
		res.sendStatus(200);
	}).catch(function(err) {
		console.log(err);
		res.sendStatus(500);
	});
});


module.exports = router;



