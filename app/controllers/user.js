const ResponseService = require('../../modules/responseService');

const getUserProfile = async (req, res) => {
	try {
		const user = req.user.toSafeJSON();

		return res.json({ user });
	} catch (err) {
		ResponseService.sendError({ res, err });
	}
};

module.exports = {
	getUserProfile,
};
