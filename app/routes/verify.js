var express = require('express');
var Methods =  require('../data/methods');
var Encrypter = require('../controllers/encrypter');
const app_config = require('../config/config');
var insertion_confirmation_grace = app_config.insertion_confirmation_grace;
var router = express.Router();


function authenticate(req, res, next) {
	Encrypter.decrypt(req.params.token).then(function(decrypted) {
		console.log("the token : " + req.params.token );
		var params = JSON.parse(decrypted);
		var date = new Date();
		var max_confirmation_date = new Date( date.setTime( 
				date.getTime() + max_confirmation_date * ( 60 * 60 * 86400000 )
			));
		if( params.submission_date > max_confirmation_date )
			res.redirect('/404');
		req.item_id = params.id;
		next();
	}).catch(function(err) {
		res.redirect('/404');
		console.log(err);
	});
}

router.get('/:token', authenticate, function(req, res) {
	Methods.findWithId(req.item_id).then(function(item){
		if(item) {
			Methods.verifyEntry(req.item_id).then(function(item) {
				return Methods.saveItem(item);
			}).then(function() {
				res.render('./verified');
			}).catch(function(err) {
				res.sendStatus(500);
				console.log(err);
			});
		}
		else {
			res.redirect('./404');
		}
	});
	
});

module.exports = router;