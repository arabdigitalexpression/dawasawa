var express = require('express');
var router = express.Router();
var static_data = require('../data/static_data');
var governorates = static_data.governorates;

router.get('/',function(req, res) {
	res.send(200).send('welcome to dawasawa API for more info visit https://github.com/arabdigitalexpression/dawasawa');
});

module.exports = router;