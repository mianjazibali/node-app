const VALUES = {
	ACCESS_TOKEN_EXPIRY: '30', // Minutes
	REFRESH_TOKEN_EXPIRY: '7', // Days
};

const ERRORS = {
	TOKEN: {
		INVALID: 'Token is not valid',
		EXPIRED: 'Token is expired',
		INACTIVE: 'Token is not active yet',
	},
};

module.exports = {
	VALUES,
	ERRORS,
};
