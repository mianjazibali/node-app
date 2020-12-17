const faker = require('faker');
const { expect } = require('chai');

const UserService = require('./../../modules/userService');
const setup = require('./setup');
const UserTestHelper = require('./helpers/user');
const ErrorTestHelper = require('./helpers/error');
const { ERRORS } = require('../../constants/user');

describe('User Service Tests', function () {
	setup.registerHooks();

	describe('Get User By UUID', function () {
		it('should get user by uuid', async function () {
			const user = await UserService.getUserByUuid({
				uuid: this.user1.uuid,
			});

			expect(user).to.have.property('id', this.user1.id);
			UserTestHelper.verifyUser({
				actualUser: user,
				expectedUser: this.user1,
			});
		});

		it('should not get user by uuid if uuid does not exist', async function () {
			const user = await UserService.getUserByUuid({
				uuid: faker.random.uuid(),
			});

			expect(user).to.be.equal(null);
		});
	});

	describe('Get User By Email', function () {
		it('should get user by email', async function () {
			const user = await UserService.getUserByEmail({
				email: this.user1.email,
			});

			expect(user).to.have.property('id', this.user1.id);
			UserTestHelper.verifyUser({
				actualUser: user,
				expectedUser: this.user1,
			});
		});

		it('should not get user by email if email does not exist', async function () {
			const user = await UserService.getUserByEmail({
				email: faker.internet.email(),
			});

			expect(user).to.be.equal(null);
		});
	});

	describe('Is Email Exist', function () {
		it('should get user by email', async function () {
			const isEmailExist = await UserService.isEmailExist({
				email: this.user1.email,
			});

			expect(isEmailExist).to.be.equal(true);
		});

		it('should not get user by email if email does not exist', async function () {
			const isEmailExist = await UserService.isEmailExist({
				email: faker.internet.email(),
			});

			expect(isEmailExist).to.be.equal(false);
		});
	});

	describe('Create User', function () {
		it('should create user', async function () {
			const userData = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			};

			const newUser = await UserService.createUser(userData);

			const dbUser = await global.db.User.findOne({
				where: { id: newUser.id },
			});

			expect(newUser).to.have.property('id', dbUser.id);
			expect(newUser).to.have.property('uuid', dbUser.uuid);
			expect(newUser).to.have.property('password', dbUser.password);
			UserTestHelper.verifyUser({
				actualUser: newUser,
				expectedUser: dbUser,
			});

			const isPasswordValid = await newUser.isPasswordValid(
				userData.password
			);
			expect(isPasswordValid).to.be.equal(true);
		});

		it('should throw error if first name is not supplied', async function () {
			try {
				const userData = {
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.FIRST_NAME.REQUIRED,
				});
			}
		});

		it('should throw error if first name is not in a string format', async function () {
			try {
				const userData = {
					firstName: faker.random.number(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.FIRST_NAME.TYPE_TEXT,
				});
			}
		});

		it('should throw error if first name is an empty string', async function () {
			try {
				const userData = {
					firstName: '',
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.FIRST_NAME.EMPTY,
				});
			}
		});

		it('should throw error if first name does not contain at least 3 characters', async function () {
			try {
				const userData = {
					firstName: 'ab',
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.FIRST_NAME.MIN_LENGTH,
				});
			}
		});

		it('should throw error if last name is not supplied', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.LAST_NAME.REQUIRED,
				});
			}
		});

		it('should throw error if last name is an empty string', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: '',
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.LAST_NAME.EMPTY,
				});
			}
		});

		it('should throw error if last name is not in a string format', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.random.number(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.LAST_NAME.TYPE_TEXT,
				});
			}
		});

		it('should throw error if last name does not contain at least 3 characters', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: 'ab',
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.LAST_NAME.MIN_LENGTH,
				});
			}
		});

		it('should throw error if email is not supplied', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					length: 2,
					message: ERRORS.EMAIL.REQUIRED,
				});
			}
		});

		it('should throw error if email is not in a string format', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.random.number(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.EMAIL.TYPE_TEXT,
				});
			}
		});

		it('should throw error if email is an empty string', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: '',
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.EMAIL.EMPTY,
				});
			}
		});

		it('should throw error if provided email is not valid', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.random.word(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.EMAIL.INVALID,
				});
			}
		});

		it('should throw error if password is not supplied', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.PASSWORD.REQUIRED,
				});
			}
		});

		it('should throw error if password is not in a string format', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.random.number(),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.PASSWORD.TYPE_TEXT,
				});
			}
		});

		it('should throw error if password is an empty string', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: '',
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.PASSWORD.EMPTY,
				});
			}
		});

		it('should throw error if password length is less than 8 characters', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(7),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.PASSWORD.MIN_LENGTH,
				});
			}
		});

		it('should throw error if password length is greater than 20 characters', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(21),
				};

				await UserService.createUser(userData);
			} catch (err) {
				ErrorTestHelper.verifyCustomError({
					error: err,
					message: ERRORS.PASSWORD.MAX_LENGTH,
				});
			}
		});
	});
});
