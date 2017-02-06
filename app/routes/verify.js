var express = require('express');
var Methods =  require('../data/methods');
var router = express.Router();

// render the home page
router.get('/:id', function(req, res) {
	Methods.verifyEntry(req.params.id).then(function(item) {
		return Methods.saveItem(item);
	}).then(function() {
		res.render('./verified');
	}).catch(function(err) {
		res.sendStatus(500);
	});
});

module.exports = router;