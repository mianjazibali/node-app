const JWT = require('jsonwebtoken');

const UserService = require('./userService');
const ValidationService = require('./validationService');
const CustomError = require('../classes/error/customError');
const { VALUES, ERRORS: AUTH_ERRORS } = require('../constants/auth');
const { ERRORS: USER_ERRORS } = require('../constants/user');

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

const _verifyToken = ({ token, secret } = {}) => {
	let payload;

	JWT.verify(token, secret, function (err, decoded) {
		if (err) {
			if (err.name === 'TokenExpiredError') {
				throw new CustomError({
					message: AUTH_ERRORS.TOKEN.EXPIRED,
					statusCode: 400,
				});
			} else if (err.name === 'NotBeforeError') {
				throw new CustomError({
					message: AUTH_ERRORS.TOKEN.INACTIVE,
					statusCode: 400,
				});
			}

			throw new CustomError({
				message: AUTH_ERRORS.TOKEN.INVALID,
				statusCode: 400,
			});
		}
		payload = decoded;
	});

	return payload;
};

const verifyAccessToken = ({ accessToken } = {}) => {
	return _verifyToken({
		token: accessToken,
		// eslint-disable-next-line no-undef
		secret: process.env.ACCESS_TOKEN_SECRET,
	});
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
	return _verifyToken({
		token: refreshToken,
		// eslint-disable-next-line no-undef
		secret: process.env.REFRESH_TOKEN_SECRET,
	});
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
		throw new CustomError({ message: USER_ERRORS.EMAIL.NOT_EXIST });
	}

	const isPasswordValid = await user.isPasswordValid(password);
	if (!isPasswordValid) {
		throw new CustomError({ message: USER_ERRORS.PASSWORD.INVALID });
	}

	return getSignedTokens({ userUuid: user.uuid });
};

module.exports = {
	verifyAccessToken,
	verifyRefreshToken,
	getSignedTokens,
	getUserSignedTokens,
};
