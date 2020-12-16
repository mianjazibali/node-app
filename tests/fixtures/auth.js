const moment = require('moment');

const {
	VALUES: { ACCESS_TOKEN_EXPIRY },
} = require('../../constants/auth');

const getTokenPayload = ({
	aud,
	iss = 'example.com',
	iat = moment().unix(),
	exp = moment.tz().add(ACCESS_TOKEN_EXPIRY, 'minutes').unix(),
} = {}) => {
	return {
		aud,
		iss,
		iat,
		exp,
	};
};

module.exports = {
	getTokenPayload,
};
