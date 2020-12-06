const faker = require('faker');

const tableName = 'Users';

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(tableName, [
			{
				v_first_name: faker.random.word(),
				v_last_name: faker.random.word(),
				v_email: faker.internet.email(),
				v_password: faker.internet.password(),
			},
			{
				v_first_name: faker.random.word(),
				v_last_name: faker.random.word(),
				v_email: faker.internet.email(),
				v_password: faker.internet.password(),
			},
			{
				v_first_name: faker.random.word(),
				v_last_name: faker.random.word(),
				v_email: faker.internet.email(),
				v_password: faker.internet.password(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete(tableName);
	},
};
