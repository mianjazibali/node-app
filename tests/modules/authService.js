const faker = require('faker');
const moment = require('moment');
const { expect } = require('chai');

const AuthService = require('../../modules/authService');
const AuthTestHelper = require('./helpers/auth');
const AuthFixture = require('./../fixtures/auth');
const { VALUES, ERRORS: AUTH_ERRORS } = require('../../constants/auth');
const setup = require('./setup');
const { ERRORS } = require('../../constants/user');

describe('Auth Service Tests', function () {
	setup.registerHooks();

	describe('Verify Access Token', function () {
		it('should verify access token', async function () {
			const actualPayload = AuthService.verifyAccessToken({
				accessToken: this.user1.tokens.accessToken,
			});

			const expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
			});

			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});
		});

		it('should throw error if token is not valid', async function () {
			try {
				AuthService.verifyAccessToken({
					accessToken: faker.random.uuid(),
				});

				expect(1).to.be.equal(2);
			} catch (err) {
				expect(err).to.have.property(
					'message',
					AUTH_ERRORS.TOKEN.INVALID
				);
			}
		});
	});

	describe('Verify Refresh Token', function () {
		it('should verify refresh token', async function () {
			const actualPayload = AuthService.verifyRefreshToken({
				refreshToken: this.user1.tokens.refreshToken,
			});

			const expectedPayload = AuthFixture.getTokenPayload({
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

		it('should throw error if token is not valid', async function () {
			try {
				AuthService.verifyRefreshToken({
					refreshToken: faker.random.uuid(),
				});

				expect(1).to.be.equal(2);
			} catch (err) {
				expect(err).to.have.property(
					'message',
					AUTH_ERRORS.TOKEN.INVALID
				);
			}
		});
	});

	describe('Get Signed Tokens', function () {
		it('should get access and refresh token with encoded payload', async function () {
			const { accessToken, refreshToken } = AuthService.getSignedTokens({
				userUuid: this.user1.uuid,
			});

			let actualPayload = AuthService.verifyAccessToken({ accessToken });
			let expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});

			actualPayload = AuthService.verifyRefreshToken({ refreshToken });
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
	});

	describe('Get User Signed Tokens', function () {
		it('should get access and refresh token with encoded payload', async function () {
			const {
				accessToken,
				refreshToken,
			} = await AuthService.getUserSignedTokens({
				email: this.user1_data.email,
				password: this.user1_data.password,
			});

			let actualPayload = AuthService.verifyAccessToken({ accessToken });
			let expectedPayload = AuthFixture.getTokenPayload({
				aud: this.user1.uuid,
			});
			AuthTestHelper.verifyTokenPayload({
				actualPayload,
				expectedPayload,
			});

			actualPayload = AuthService.verifyRefreshToken({ refreshToken });
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

		it('should throw error if email is not provided', async function () {
			try {
				await AuthService.getUserSignedTokens({
					password: faker.internet.password(),
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.EMAIL.REQUIRED);
			}
		});

		it('should throw error if email is not in a string format', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: faker.random.number(),
					password: faker.internet.password(),
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.EMAIL.TYPE_TEXT);
			}
		});

		it('should throw error if email is an empty string', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: '',
					password: faker.internet.password(),
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.EMAIL.EMPTY);
			}
		});

		it('should throw error if email is not valid', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: faker.random.word(),
					password: faker.internet.password(),
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.EMAIL.INVALID);
			}
		});

		it('should throw error if email does not exist', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: faker.internet.email(),
					password: this.user1_data.password,
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.EMAIL.NOT_EXIST);
			}
		});

		it('should throw error if password is not provided', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
				});
			} catch (err) {
				expect(err).to.have.property(
					'message',
					ERRORS.PASSWORD.REQUIRED
				);
			}
		});

		it('should throw error if password is not in a string format', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.random.number(),
				});
			} catch (err) {
				expect(err).to.have.property(
					'message',
					ERRORS.PASSWORD.TYPE_TEXT
				);
			}
		});

		it('should throw error if password is an empty string', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: '',
				});
			} catch (err) {
				expect(err).to.have.property('message', ERRORS.PASSWORD.EMPTY);
			}
		});

		it('should throw error if password length is less than 8 characters', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(7),
				});
			} catch (err) {
				expect(err).to.have.property(
					'message',
					ERRORS.PASSWORD.MIN_LENGTH
				);
			}
		});

		it('should throw error if password length is greater than 21 characters', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(21),
				});
			} catch (err) {
				expect(err).to.have.property(
					'message',
					ERRORS.PASSWORD.MAX_LENGTH
				);
			}
		});

		it('should throw error if password is not valid', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(8),
				});
			} catch (err) {
				expect(err).to.have.property(
					'message',
					ERRORS.PASSWORD.INVALID
				);
			}
		});
	});
});
