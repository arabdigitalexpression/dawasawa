// var express = require('express');
// var router = express.Router();
// var Methods =  require('../data/methods');
// var Encrypter = require('../controllers/encrypter');
// const app_config = require('../config/config');
// var insertion_confirmation_grace = app_config.insertion_confirmation_grace;


// function authenticateEmail(req, res, next) {
// 	Encrypter.decrypt(req.params.token).then(function(decrypted) {
// 		console.log('decrypted : ' + decrypted);
// 		var params = JSON.parse(decrypted);
// 		var date = new Date();
// 		var max_confirmation_date = new Date( date.setTime( 
// 				date.getTime() + max_confirmation_date * ( 60 * 60 * 86400000 )
// 			));
// 		if( params.submission_date > max_confirmation_date )
// 			res.redirect('/404');
// 		req.email = params.email;
// 		next();
// 	}).catch(function(err) {
// 		console.log(err);
// 		res.redirect('/404');
// 	});
// }

// function authenticateId(req, res, next) {
// 	Encrypter.decrypt(req.body.token).then(function(decrypted) {
// 		console.log('decrypted : ' + decrypted);
// 		var params = JSON.parse(decrypted);
// 		var date = new Date();
// 		var max_confirmation_date = new Date( date.setTime( 
// 				date.getTime() + max_confirmation_date * ( 60 * 60 * 86400000 )
// 			));
// 		if( params.request_date > max_confirmation_date )
// 			res.redirect('/404');
// 		req.item_id = params.id;
// 		next();
// 	}).catch(function(err) {
// 		console.log(err);
// 		res.redirect('/404');
// 	});
// }

// router.get('/', function(req, res) {
// 	res.redirect('/404');
// });
// // render the home page
// router.get('/:token', authenticateEmail, function(req, res) {

// 	Methods.findWithEmail(req.email).then(function(items){
// 		if(items.length != 0) {
// 			console.log('items found');
// 			items.forEach((item) => {
// 				var expireDate = new Date(item.expire_date);
// 				var submissionDate = new Date(item.submission_date);
// 				var e_m = expireDate.getMonth() + 1;
// 				var e_y = expireDate.getFullYear();
// 				var s_m = submissionDate.getMonth() + 1;
// 				var s_y = submissionDate.getFullYear();
// 				item.expire_month = e_m;
// 				item.expire_year = e_y;
// 				item.submission_month = s_m;
// 				item.submission_year = s_y;
// 				var params = {
// 					id: item._id,
// 					request_date: Date()
// 				}
// 				Encrypter.encrypt(JSON.stringify(params)).then(function(encrypted) {
// 					item.delete_token = encrypted;
// 				}).catch(function() {
// 					res.sendStatus(500);
// 				});
// 			});
// 			setTimeout(function() {
// 				res.render('mylist', {
// 					results: items 
// 				});
// 			}, 100);
// 		} else {
// 			console.log('items not found');
// 			res.redirect('/404');
// 		}
// 	}).catch(function(err) {
// 		console.log(err);
// 		res.sendStatus(500);
// 	});
// });



// router.post('/delete', authenticateId, function(req, res) {
// 	Methods.removeItem(req.item_id).then(function() {
// 		console.log('removed');
// 		res.sendStatus(200);
// 	}).catch(function(err) {
// 		console.log(err);
// 		res.sendStatus(500);
// 	});
// });


// module.exports = router;

const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')
	  Validator = require('../middleware/validator'),
	  Encrypter = require('../controllers/encrypter')

let router = express.Router()

router.get('/:token', Validator.validateToken , Encrypter.decrypt ,(req, res) => {
	MedicineCtrl.findWithEmail(req.token.f).then((meds) => {
		return Token.generateRemoveToken(meds)
	}).then((meds) => {
		res.send(meds)
	}).catch((err) => {
		console.log(err)
		if(err.code == 404) {
			res.status(err.code).send(err.message)
		}
		res.status(500).send('Internal server error')
	})
})

module.exports = router









