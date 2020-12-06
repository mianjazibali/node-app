const faker = require('faker');

const tableName = 'Items';

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(tableName, [
			{
				v_title: faker.random.words(),
				fk_user_id: 1,
			},
			{
				v_title: faker.random.words(),
				fk_user_id: 3,
			},
			{
				v_title: faker.random.words(),
				fk_user_id: 1,
			},
			{
				v_title: faker.random.words(),
				fk_user_id: 2,
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete(tableName);
	},
};
