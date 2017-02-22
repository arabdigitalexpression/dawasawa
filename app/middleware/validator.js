const Joi = require('joi'),
	  Config = require('../config/config')

// let date = new Date()
// let checkDate = new Date(date.setTime( 
// 	date.getTime() - (Config.insertion_challenge_grace * 60 * 60 * 1000)))
// console.log(checkDate)

let Validator = {}

const medicineSchema = Joi.object().max(8).keys({
	latin_name: Joi.string().required(),
	arabic_name: Joi.string(),
	governorate: Joi.string().required(),
	expiry_date: Joi.date().min('now').required(),
	package_state: Joi.string().required(),
	notes: Joi.string(),
	contact: Joi.object().max(4).keys({
		name: Joi.string().required(),
		email_address: Joi.string().email().required(),
		phone: Joi.string(),
		email_visible: Joi.boolean()
	}),
	terms_accepted: Joi.any().valid('y', 'true', 'checked')
})

const idSchema = Joi.object().max(1).keys({
	_id: Joi.string().required().hex().length(24)
})

const email_address = Joi.string().email().required()

const contactSchema = Joi.object().max(8).keys({
	name: Joi.string().required(),
	email_address: Joi.string().email().required(),
	message: Joi.string().required()
})

Validator.validateMedicineObject = (req, res, next) => {
	/*
	 * validate the submitted medicine object
	 */
	Joi.validate(req.body, medicineSchema, (err, value) => {
		if(err) {
			return res.status(400).json({
				"error": err.name,
				"details": err.details 
			})
		}
		return next()
	})
}

Validator.validateId = (req, res, next) => {
	/*
	 * validate the submitted ID
	 */
	Joi.validate(req.body, idSchema, (err, value) => {
		if(err) {
			return res.status(400).json({
				"error": err.name,
				"details": err.details 
			})
		}
		return next()
	})
}

Validator.validateEmail = (req, res, next) => {
	/*
	 * validate the submitted ID
	 */
	Joi.validate(req.body, email_address, (err, value) => {
		if(err) {
			return res.status(400).json({
				"error": err.name,
				"details": err.details 
			})
		}
		return next()
	})
}


Validator.validateContactSchema = (req, res, next) => {
	/*
	 * validate the submitted ID
	 */
	Joi.validate(req.body, contactSchema, (err, value) => {
		if(err) {
			return res.status(400).json({
				"error": err.name,
				"details": err.details 
			})
		}
		return next()
	})
}


module.exports = Validator