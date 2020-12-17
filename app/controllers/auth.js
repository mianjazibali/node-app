const UserService = require('../../modules/userService');
const AuthService = require('../../modules/authService');
const ResponseService = require('../../modules/responseService');

const register = async (req, res) => {
	try {
		const user = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		return res.json({ user: user.toSafeJSON() });
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

const login = async (req, res) => {
	try {
		const userAuthTokens = await AuthService.getUserSignedTokens({
			email: req.body.email,
			password: req.body.password,
		});

		return res.json(userAuthTokens);
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

const getSignedTokens = async (req, res) => {
	try {
		const userAuthTokens = AuthService.getSignedTokens({
			userUuid: req.payload.aud,
		});

		return res.json(userAuthTokens);
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

module.exports = {
	register,
	login,
	getSignedTokens,
};
