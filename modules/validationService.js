const Joi = require('joi');

const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

module.exports = {
	validateUser,
	validateLogin,
};
