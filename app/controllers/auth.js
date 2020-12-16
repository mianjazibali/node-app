const UserService = require('../../modules/userService');
const AuthService = require('../../modules/authService');

const register = async (req, res) => {
	try {
		const user = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		return res.json({ user: user.toSafeJSON() });
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return res.status(statusCode).send(error.message);
	}
};

const login = async (req, res) => {
	try {
		const userAuthTokens = await AuthService.getUserSignedTokens({
			email: req.body.email,
			password: req.body.password,
		});

		return res.json(userAuthTokens);
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return res.status(statusCode).send(error.message);
	}
};

const getSignedTokens = async (req, res) => {
	try {
		const userAuthTokens = AuthService.getSignedTokens({
			userUuid: req.payload.aud,
		});

		return res.json(userAuthTokens);
	} catch (error) {
		const statusCode = error.statusCode || 500;
		res.status(statusCode).send(error.message);
	}
};

module.exports = {
	register,
	login,
	getSignedTokens,
};
