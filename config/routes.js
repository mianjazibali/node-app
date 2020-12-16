const routers = require('./../app/routers');

const { verifyAccessToken } = require('../middleware/auth');
const { loadUser } = require('../middleware/loadResource');

module.exports = function (app) {
	app.use('/api/auth', routers.auth);
	app.use('/api/user', verifyAccessToken, loadUser, routers.user);
};
