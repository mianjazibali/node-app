const VALUES = {
	SALT_ROUNDS: 10,

	FIRST_NAME_MIN_LENGTH: 3,
	LAST_NAME_MIN_LENGTH: 3,
	PASSWORD_MIN_LENGTH: 8,
	PASSWORD_MAX_LENGTH: 20,
};

const ERRORS = {
	EMAIL_ALREADY_EXISTS: '"email" already exists',
	EMAIL_DOES_NOT_EXIST: '"email" does not exist',
	INVALID_PASSWORD: '"password" does not match',
};

module.exports = {
	VALUES,
	ERRORS,
};
