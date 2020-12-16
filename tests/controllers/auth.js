const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');
const moment = require('moment');

const app = require('../../server.js');
const setup = require('../modules/setup');
const AuthService = require('../../modules/authService');
const AuthFixture = require('../fixtures/auth');
const AuthTestHelper = require('../modules/helpers/auth');
const UserTestHelper = require('../modules/helpers/user');
const { VALUES } = require('../../constants/auth');
const { ERRORS } = require('../../constants/user');

describe('User Controller Tests', function () {
	setup.registerHooks();

	describe('Login', function () {
		it('should return user valid access and refresh token on successful login', async function () {
			const { body: response } = await request(app)
				.post('/api/auth/login')
				.set('Accept', 'application/json')
				.send({
					email: this.user1_data.email,
					password: this.user1_data.password,
				})
				.expect(200);

			expect(response).to.have.all.keys(['accessToken', 'refreshToken']);

			let actualPayload = AuthService.verifyAccessToken({
				accessToken: response.accessToken,
			});
			let expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});

			actualPayload = AuthService.verifyRefreshToken({
				refreshToken: response.refreshToken,
			});
			expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
				exp: moment
					.tz()
					.add(VALUES.REFRESH_TOKEN_EXPIRY, 'days')
					.unix(),
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});
		});

		it('should not return user access and refresh token if email does not exist', async function () {
			const response = await request(app)
				.post('/api/auth/login')
				.set('Accept', 'application/json')
				.send({
					email: faker.internet.email(),
					password: this.user1_data.password,
				})
				.expect(400);

			expect(response).to.have.property(
				'text',
				ERRORS.EMAIL_DOES_NOT_EXIST
			);
		});

		it('should not return user access and refresh token if password does not match', async function () {
			const response = await request(app)
				.post('/api/auth/login')
				.set('Accept', 'application/json')
				.send({
					email: this.user1_data.email,
					password: faker.internet.password(),
				})
				.expect(400);

			expect(response).to.have.property('text', ERRORS.INVALID_PASSWORD);
		});
	});

	describe('Register', function () {
		it('should register user', async function () {
			const userData = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			};

			const { body: response } = await request(app)
				.post('/api/auth/register')
				.set('Accept', 'application/json')
				.send(userData)
				.expect(200);

			expect(response).to.have.property('user');
			expect(response.user).to.not.have.property('password');
			UserTestHelper.verifyUser(response.user, userData);
		});

		it('should not register user if email already exists', async function () {
			const response = await request(app)
				.post('/api/auth/register')
				.set('Accept', 'application/json')
				.send({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: this.user1_data.email,
					password: faker.internet.password(),
				})
				.expect(500);

			expect(response).to.have.property(
				'text',
				`Validation error: ${ERRORS.EMAIL_ALREADY_EXISTS}`
			);
		});
	});

	describe('Refresh Tokens', function () {
		it('should return valid refreshed authentication tokens', async function () {
			const { body: response } = await request(app)
				.post('/api/auth/refresh-token')
				.set('Accept', 'application/json')
				.set(
					'Authorization',
					`Bearer ${this.user1.tokens.refreshToken}`
				)
				.expect(200);

			expect(response).to.have.all.keys(['accessToken', 'refreshToken']);

			let actualPayload = AuthService.verifyAccessToken({
				accessToken: response.accessToken,
			});
			let expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});

			actualPayload = AuthService.verifyRefreshToken({
				refreshToken: response.refreshToken,
			});
			expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
				exp: moment
					.tz()
					.add(VALUES.REFRESH_TOKEN_EXPIRY, 'days')
					.unix(),
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});
		});

		it('should not return refreshed authentication tokens', async function () {
			const response = await request(app)
				.post('/api/auth/refresh-token')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${this.user1.tokens.accessToken}`)
				.expect(500);

			expect(response).to.have.property('text', 'invalid signature');
		});
	});
});
