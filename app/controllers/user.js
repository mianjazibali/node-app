const UserService = require('../../modules/userService');

const getAllUsers = async (req, res) => {
	try {
		const users = await UserService.getAllUsers();

		return res.status(200).json({ users });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	getAllUsers,
};
