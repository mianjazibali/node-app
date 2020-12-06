const faker = require('faker');
const _ = require('lodash');

const UserService = require('./../../modules/userService');

const getUserData = (options) => {
	return _.assign(
		{
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		},
		options
	);
};

const createUser = (options) => {
	const userData = getUserData(options);

	return UserService.createUser(userData);
};

module.exports = {
	getUserData,
	createUser,
};
