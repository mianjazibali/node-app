const faker = require('faker');

const ItemService = require('./../../modules/itemService');

const getItemData = ({
	title = faker.random.word(),
	userId = faker.random.number(),
} = {}) => {
	return {
		title,
		userId,
	};
};

const createItem = ({
	title = faker.random.word(),
	userId = faker.random.number(),
} = {}) => {
	const itemData = getItemData({ title, userId });

	return ItemService.createItem(itemData);
};

module.exports = {
	getItemData,
	createItem,
};
