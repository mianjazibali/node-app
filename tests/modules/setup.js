const fixtures = require('../fixtures');

const { User, Item } = global.db;

module.exports.registerHooks = function () {
	beforeEach(async function () {
		this.user1 = await fixtures.user.createUser();
		this.user1_item1 = await fixtures.item.createItem({
			userId: this.user1.id,
		});
	});

	afterEach(async () => {
		await User.destroy({ where: {} });
		return Item.destroy({ where: {} });
	});
};
