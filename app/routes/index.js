var express = require('express');
var router = express.Router();
var static_data = require('../data/static_data');
var governorates = static_data.governorates;

// render the home page
router.get('/', function(req, res) {
	res.render('index', {
		governorates: governorates
	});
});
router.get('/home',function(req, res) {
	res.render('index', {
		governorates: governorates
	});
});

module.exports = router;