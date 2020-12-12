const routers = require('./../app/routers');

module.exports = function (app) {
	app.use('/users', routers.user);
};
