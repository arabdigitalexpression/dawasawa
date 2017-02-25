const Joi = require('joi'),
	  Config = require('../config/config')

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

const token = Joi.string().max(108).required()

Validator.validateMedicineObject = (req, res, next) => {
	/*
	 * validate the submitted medicine object
	 */
	Joi.validate(req.body.medicine, medicineSchema, (err, value) => {
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
	 * validate the submitted email for "list_entries" page
 	 */
	Joi.validate(req.body.email_address, email_address, (err, value) => {
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
	 * validate the submitted contact info and message for "emailus" page
	 */
	Joi.validate(req.body.contact, contactSchema, (err, value) => {
		if(err) {
			return res.status(400).json({
				"error": err.name,
				"details": err.details 
			})
		}
		return next()
	})
}

Validator.validateToken = (req, res, next) => {
	/*
	 * validate the submitted token
	 */
	Joi.validate(req.params.token, token, (err, value) => {
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