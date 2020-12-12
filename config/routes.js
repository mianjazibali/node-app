const routers = require('./../app/routers');

module.exports = function (app) {
	app.use('/api/auth', routers.auth);
	app.use('/api/users', routers.user);
};
