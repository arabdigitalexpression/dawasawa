var express = require('express');
var Methods =  require('../data/methods');
var router = express.Router();
var static_data = require('../data/static_data');
var governorates = static_data.governorates;


	function renderResults (req, res) {
		res.render('./results', { 
			governorates: governorates, 
			results: req.results,
			length: req.results.length,
			searched_term: req.term,
			searched_gov: req.governorate
		});
	}
function findResults (req, res, next) {		
	Methods.findMedicine(req.query.term, req.query.governorate).then(function(items) {
		if(items.length != 0) {
			items.forEach((item) => {
				var mydate = new Date(item.expire_date);
				var m = mydate.getMonth() + 1;
				var y = mydate.getFullYear();
				item.expire_month = m;
				item.expire_year = y;
			});
			req.results = items;
			req.term = req.query.term;
			req.governorate = req.query.governorate;
			return next();
		} else {
			res.render('./results', { 
				governorates: governorates, 
				results: 0,
				length: 0,
				searched_term: req.query.term,
				searched_gov: req.query.governorate
			});
		}
	}, function(err) {
		res.status(500);
	});
	}

// render the home page
router.get('/', findResults, renderResults);


module.exports = router;