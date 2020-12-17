const Joi = require('@hapi/joi');

const { VALUES, ERRORS } = require('../constants/user');

const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string()
			.min(VALUES.FIRST_NAME_MIN_LENGTH)
			.required()
			.messages({
				'any.required': ERRORS.FIRST_NAME.REQUIRED,
				'string.base': ERRORS.FIRST_NAME.TYPE_TEXT,
				'string.empty': ERRORS.FIRST_NAME.EMPTY,
				'string.min': ERRORS.FIRST_NAME.MIN_LENGTH,
			}),
		lastName: Joi.string()
			.min(VALUES.LAST_NAME_MIN_LENGTH)
			.required()
			.messages({
				'any.required': ERRORS.LAST_NAME.REQUIRED,
				'string.base': ERRORS.LAST_NAME.TYPE_TEXT,
				'string.empty': ERRORS.LAST_NAME.EMPTY,
				'string.min': ERRORS.LAST_NAME.MIN_LENGTH,
			}),
		email: Joi.string().required().email().messages({
			'any.required': ERRORS.EMAIL.REQUIRED,
			'string.base': ERRORS.EMAIL.TYPE_TEXT,
			'string.empty': ERRORS.EMAIL.EMPTY,
			'string.email': ERRORS.EMAIL.INVALID,
		}),
		password: Joi.string()
			.min(VALUES.PASSWORD_MIN_LENGTH)
			.max(VALUES.PASSWORD_MAX_LENGTH)
			.required()
			.messages({
				'any.required': ERRORS.PASSWORD.REQUIRED,
				'string.base': ERRORS.PASSWORD.TYPE_TEXT,
				'string.empty': ERRORS.PASSWORD.EMPTY,
				'string.min': ERRORS.PASSWORD.MIN_LENGTH,
				'string.max': ERRORS.PASSWORD.MAX_LENGTH,
			}),
	});

	return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email().messages({
			'any.required': ERRORS.EMAIL.REQUIRED,
			'string.base': ERRORS.EMAIL.TYPE_TEXT,
			'string.empty': ERRORS.EMAIL.EMPTY,
			'string.email': ERRORS.EMAIL.INVALID,
		}),
		password: Joi.string()
			.min(VALUES.PASSWORD_MIN_LENGTH)
			.max(VALUES.PASSWORD_MAX_LENGTH)
			.required()
			.messages({
				'any.required': ERRORS.PASSWORD.REQUIRED,
				'string.base': ERRORS.PASSWORD.TYPE_TEXT,
				'string.empty': ERRORS.PASSWORD.EMPTY,
				'string.min': ERRORS.PASSWORD.MIN_LENGTH,
				'string.max': ERRORS.PASSWORD.MAX_LENGTH,
			}),
	});

	return schema.validate(data);
};

module.exports = {
	validateUser,
	validateLogin,
};
