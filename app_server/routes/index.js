var express = require('express');
var router = express.Router();
var static_data = require('../data/static_data');
var governorates = static_data.governorates;

router.get('/',function(req, res) {
	res.status(200).json({
		"message" : "welcome to Dawasawa API",
		"Documentation" : "https://github.com/arabdigitalexpression/dawasawa"
	});
});

module.exports = router;