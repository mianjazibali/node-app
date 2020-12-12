const UserService = require('./../../modules/userService');

const register = async (req, res) => {
	try {
		const user = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const login = async (req, res) => {
	try {
		const userAuthToken = await UserService.getUserAuthToken({
			email: req.body.email,
			password: req.body.password,
		});

		return res.header('auth-token', userAuthToken);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	register,
	login,
};
