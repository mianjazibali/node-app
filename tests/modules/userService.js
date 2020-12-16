const faker = require('faker');
const { expect } = require('chai');

const UserService = require('./../../modules/userService');
const setup = require('./setup');
const UserTestHelper = require('./helpers/user');
const ErrorTestHelper = require('./helpers/error');

describe('User Service Tests', function () {
	setup.registerHooks();

	describe('Get User By UUID', function () {
		it('should get user by uuid', async function () {
			const user = await UserService.getUserByUuid({
				uuid: this.user1.uuid,
			});

			expect(user).to.have.property('id', this.user1.id);
			UserTestHelper.verifyUser(user, this.user1);
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
			UserTestHelper.verifyUser(user, this.user1);
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
			UserTestHelper.verifyUser(newUser, dbUser);

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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 2,
					message: '"firstName" is required',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 2,
					message: 'Validation notEmpty on firstName failed',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 1,
					index: 0,
					message:
						'"firstName" length must be at least 3 characters long',
				});
			}
		});

		it('should throw error if last name is supplied', async function () {
			try {
				const userData = {
					firstName: faker.name.firstName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};

				await UserService.createUser(userData);
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 2,
					message: '"lastName" is required',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 2,
					message: 'Validation notEmpty on lastName failed',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 1,
					index: 0,
					message:
						'"lastName" length must be at least 3 characters long',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 1,
					index: 0,
					message: '"email" must be a valid email',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 1,
					index: 0,
					message:
						'"password" length must be at least 8 characters long',
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
			} catch (error) {
				ErrorTestHelper.verifyCustomError({
					error,
					length: 1,
					index: 0,
					message:
						'"password" length must be less than or equal to 20 characters long',
				});
			}
		});
	});
});
