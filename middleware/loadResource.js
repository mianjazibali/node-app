const CustomError = require('../classes/error/customError');

const UserService = require('../modules/userService');
const { ERRORS } = require('../constants/auth');

const loadUser = async (req, res, next) => {
	try {
		const user = await UserService.getUserByUuid({ uuid: req.payload.aud });
		if (!user) {
			throw new CustomError({ message: ERRORS.INVALID_TOKEN });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	loadUser,
};
