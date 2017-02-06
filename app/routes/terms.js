var express = require('express');
var router = express.Router();

// render the home page
router.get('/', function(req, res) {
	res.render('terms');
});

module.exports = router;