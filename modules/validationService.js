const Joi = require('joi');

const { VALUES } = require('../constants/user');

const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(VALUES.FIRST_NAME_MIN_LENGTH).required(),
		lastName: Joi.string().min(VALUES.LAST_NAME_MIN_LENGTH).required(),
		email: Joi.string().required().email(),
		password: Joi.string()
			.min(VALUES.PASSWORD_MIN_LENGTH)
			.max(VALUES.PASSWORD_MAX_LENGTH)
			.required(),
	});

	return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string()
			.min(VALUES.PASSWORD_MIN_LENGTH)
			.max(VALUES.PASSWORD_MAX_LENGTH)
			.required(),
	});

	return schema.validate(data);
};

module.exports = {
	validateUser,
	validateLogin,
};
