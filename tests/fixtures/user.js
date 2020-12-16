const faker = require('faker');

const UserService = require('./../../modules/userService');

const getUserData = ({
	firstName = faker.name.firstName(),
	lastName = faker.name.lastName(),
	email = faker.internet.email(),
	password = faker.internet.password(),
} = {}) => {
	return {
		firstName,
		lastName,
		email,
		password,
	};
};

const createUser = ({
	firstName = faker.name.firstName(),
	lastName = faker.name.lastName(),
	email = faker.internet.email(),
	password = faker.internet.password(),
} = {}) => {
	const userData = getUserData({ firstName, lastName, email, password });

	return UserService.createUser(userData);
};

module.exports = {
	getUserData,
	createUser,
};
