const fixtures = require('../fixtures');
const AuthService = require('../../modules/authService');

const { User } = global.db;

module.exports.registerHooks = function () {
	beforeEach(async function () {
		this.user1_data = fixtures.user.getUserData();
		this.user1 = await fixtures.user.createUser(this.user1_data);
		this.user1.tokens = AuthService.getSignedTokens({
			userUuid: this.user1.uuid,
		});
	});

	afterEach(async () => {
		await User.destroy({ where: {} });
	});
};
