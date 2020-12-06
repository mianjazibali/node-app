const faker = require('faker');
const _ = require('lodash');

const ItemService = require('./../../modules/itemService');

const getItemData = (options) => {
	return _.assign(
		{
			title: faker.random.word(),
			userId: faker.random.number(),
		},
		options
	);
};

const createItem = (options) => {
	const itemData = getItemData(options);

	return ItemService.createItem(itemData);
};

module.exports = {
	getItemData,
	createItem,
};
