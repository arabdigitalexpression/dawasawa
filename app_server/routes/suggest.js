const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')

let router = express.Router()

router.get('/:key', (req, res)=> {
	MedicineCtrl.suggest(req.params.key).then((meds) => {
		let results = []
		meds.forEach(function(med) {
			results.push(med.latin_name)
		})
		setTimeout(function() {
			res.send(results)
		}, 1)
	}).catch((err) => {
		console.log(err)
		res.sendStatus(500)
	})
})

module.exports = router