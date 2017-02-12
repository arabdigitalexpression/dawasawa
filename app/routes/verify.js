var express = require('express');
var Methods =  require('../data/methods');
var Encrypter = require('../controllers/encrypter');
const app_config = require('../config/config');
var insertion_confirmation_grace = app_config.insertion_confirmation_grace;
var router = express.Router();


function authenticate(req, res, next) {
	Encrypter.decrypt(req.params.token).then(function(decrypted) {
		var params = JSON.parse(decrypted);
		var date = new Date();
		var max_confirmation_date = new Date( date.setTime( 
				date.getTime() + max_confirmation_date * ( 60 * 60 * 86400000 )
			));
		if( params.submission_date > max_confirmation_date )
			res.sendStatus(403);
		req.item_id = params.id;
		next();
	}).catch(function(err) {
		res.sendStatus(403);
		console.log(err);
	});
}

// render the home page
router.get('/:token', authenticate, function(req, res) {
	Methods.verifyEntry(req.item_id).then(function(item) {
		return Methods.saveItem(item);
	}).then(function() {
		res.render('./verified');
	}).catch(function(err) {
		res.sendStatus(500);
	});
});

module.exports = router;