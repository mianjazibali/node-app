const JWT = require('jsonwebtoken');

const UserService = require('./userService');
const ValidationService = require('./validationService');
const CustomError = require('../classes/error/customError');
const { VALUES } = require('../constants/auth');
const { ERRORS } = require('../constants/user');

const _signAccessToken = ({ userUuid } = {}) => {
	const payload = {};
	// eslint-disable-next-line no-undef
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const options = {
		expiresIn: `${VALUES.ACCESS_TOKEN_EXPIRY}m`,
		issuer: 'example.com',
		audience: userUuid,
	};

	return JWT.sign(payload, secret, options);
};

const verifyAccessToken = ({ accessToken } = {}) => {
	// eslint-disable-next-line no-undef
	return JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
};

const _signRefreshToken = ({ userUuid } = {}) => {
	const payload = {};
	// eslint-disable-next-line no-undef
	const secret = process.env.REFRESH_TOKEN_SECRET;
	const options = {
		expiresIn: `${VALUES.REFRESH_TOKEN_EXPIRY}d`,
		issuer: 'example.com',
		audience: userUuid,
	};

	return JWT.sign(payload, secret, options);
};

const verifyRefreshToken = ({ refreshToken } = {}) => {
	// eslint-disable-next-line no-undef
	return JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

const getSignedTokens = ({ userUuid } = {}) => {
	const accessToken = _signAccessToken({ userUuid });
	const refreshToken = _signRefreshToken({ userUuid });

	return { accessToken, refreshToken };
};

const getUserSignedTokens = async ({ email, password } = {}) => {
	const { error } = ValidationService.validateLogin({
		email,
		password,
	});

	if (error) {
		throw new CustomError({ message: error.details[0].message });
	}

	const user = await UserService.getUserByEmail({ email });
	if (!user) {
		throw new CustomError({ message: ERRORS.EMAIL_DOES_NOT_EXIST });
	}

	const isPasswordValid = await user.isPasswordValid(password);
	if (!isPasswordValid) {
		throw new CustomError({ message: ERRORS.INVALID_PASSWORD });
	}

	return getSignedTokens({ userUuid: user.uuid });
};

module.exports = {
	verifyAccessToken,
	verifyRefreshToken,
	getSignedTokens,
	getUserSignedTokens,
};
