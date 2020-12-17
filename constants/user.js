const VALUES = {
	SALT_ROUNDS: 10,

	FIRST_NAME_MIN_LENGTH: 3,
	LAST_NAME_MIN_LENGTH: 3,
	PASSWORD_MIN_LENGTH: 8,
	PASSWORD_MAX_LENGTH: 20,
};

const ERRORS = {
	FIRST_NAME: {
		REQUIRED: 'First name is required',
		TYPE_TEXT: 'First name should be of type string',
		EMPTY: 'First name cannot be empty',
		MIN_LENGTH: `First name should contain at least ${VALUES.FIRST_NAME_MIN_LENGTH} characters`,
	},
	LAST_NAME: {
		REQUIRED: 'Last name is required',
		TYPE_TEXT: 'Last name should be of type string',
		EMPTY: 'Last name cannot be empty',
		MIN_LENGTH: `Last name should contain at least ${VALUES.FIRST_NAME_MIN_LENGTH} characters`,
	},
	EMAIL: {
		REQUIRED: 'Email is required',
		TYPE_TEXT: 'Email should be of type string',
		EMPTY: 'Email cannot be empty',
		INVALID: 'Email must be a valid email',
		EXISTS: 'Email already exists',
		NOT_EXIST: 'Email does not exist',
	},
	PASSWORD: {
		REQUIRED: 'Password is required',
		TYPE_TEXT: 'Password should be of type string',
		EMPTY: 'Password cannot be empty',
		MIN_LENGTH: `Password should contain at least ${VALUES.PASSWORD_MIN_LENGTH} characters`,
		MAX_LENGTH: `Password should contain at most ${VALUES.PASSWORD_MAX_LENGTH} characters`,
		INVALID: 'Password is not valid',
	},
};

module.exports = {
	VALUES,
	ERRORS,
};
