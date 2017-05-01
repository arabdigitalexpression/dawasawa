const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  async = require('async'),
	  unique = require('array-unique')

let router = express.Router()

router.get('/:key', (req, res)=> {
	MedicineCtrl.suggest(req.params.key).then((meds) => {
		let results = []
		async.each(meds, function(med, callback) {
			results.push(med.latin_name)
			callback()
		}, function() {
			res.send(unique(results))
		})
	}).catch((err) => {
		console.log(err)
		res.sendStatus(500)
	})
})

module.exports = router