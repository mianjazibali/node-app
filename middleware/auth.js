const CustomError = require('../classes/error/customError');

const AuthService = require('../modules/authService');
const ResponseService = require('../modules/responseService');
const { ERRORS } = require('../constants/auth');

const verifyAccessToken = (req, res, next) => {
	try {
		const authHeader = req.header('Authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new CustomError({ message: ERRORS.TOKEN.INVALID });
		}

		const bearerToken = authHeader.split(' ');
		const accessToken = bearerToken[1];

		const payload = AuthService.verifyAccessToken({ accessToken });

		req.payload = payload;
		next();
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

const verifyRefreshToken = (req, res, next) => {
	try {
		const authHeader = req.header('Authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new CustomError({ message: ERRORS.TOKEN.INVALID });
		}

		const bearerToken = authHeader.split(' ');
		const refreshToken = bearerToken[1];

		const payload = AuthService.verifyRefreshToken({ refreshToken });

		req.payload = payload;
		next();
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

module.exports = {
	verifyAccessToken,
	verifyRefreshToken,
};
