const express = require('express'),
	  MedicineCtrl = require('../controllers/medicine_ctrl')

let router = express.Router()

router.get('/:token', Encrypter.decryptAuth, Encrypter.decrypt, (req, res)=> {
	MedicineCtrl.findWithId(req.token.f).then((med)=> {
		res.send(med)
	}).catch((err)=> {
		res.sendStatus(500)
	})
})



module.exports = router