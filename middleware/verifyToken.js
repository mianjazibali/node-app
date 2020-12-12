const jwt = require('jsonwebtoken');

const {
	ERRORS: { INVALID_TOKEN, ACCESS_DENIED },
} = require('./../constants/auth');

module.exports = function (req, res, next) {
	try {
		const authToken = req.header('auth-token');
		if (!authToken) {
			return res.status(401).send(ACCESS_DENIED);
		}
		// eslint-disable-next-line no-undef
		const verified = jwt.verify(authToken, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).send(INVALID_TOKEN);
	}
};
