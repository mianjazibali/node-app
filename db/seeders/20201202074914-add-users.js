const _ = require('lodash');
const bcrypt = require('bcrypt');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const Promise = require('bluebird');

const {
	VALUES: { SALT_ROUNDS },
} = require('./../constants/user');

const tableName = 'Users';

module.exports = {
	up: async (queryInterface) => {
		const users = await Promise.map(_.range(0, 3), async () => {
			const hashedPassword = await bcrypt.hash(
				faker.internet.password(),
				SALT_ROUNDS
			);

			return {
				uuid: uuidv4(),
				v_first_name: faker.random.word(),
				v_last_name: faker.random.word(),
				v_email: faker.internet.email(),
				v_password: hashedPassword,
			};
		});

		return queryInterface.bulkInsert(tableName, users);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete(tableName);
	},
};
