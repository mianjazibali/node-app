const getUserProfile = async (req, res) => {
	try {
		const user = req.user.toSafeJSON();

		return res.json({ user });
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return res.status(statusCode).send(error.message);
	}
};

module.exports = {
	getUserProfile,
};
