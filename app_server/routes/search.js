const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl'),
	  Token = require('../controllers/token_gen')


let router = express.Router()

router.get('/', (req, res) => {
	if(req.query.name == undefined)
		/*
		 * validate the request 
		 * The app will not search the database if the medicine name is undefined
		 */
		res.sendStatus(400) 
	else {
		/*
		 * The app will search the database for a matched name and governorate
		 */
		MedicineCtrl.filter(req.query.name, req.query.gov, req.query.page).then((results) => {
			// return the result if found
			return Token.generateAccessToken(results, "GET")
		}).then((results) => {

			results.forEach((med)=> {
				let expire_month = med.expiry_date.getMonth() 
				let expire_year = med.expiry_date.getFullYear()
				med.expiry_date = expire_month + "-" + expire_year
			})

			setTimeout(()=> {
				res.send(results)
			}, 1000)
		}).catch((err) => {
			if(err){
				console.log(err)
				if(err.code == 404) {
					// return 404 if not found
					res.status(404).send(err.message)
				} else {
					// return 500 for any server error
					res.sendStatus(500)
				}
			}
		})
	}
})

module.exports = router

