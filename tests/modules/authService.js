const faker = require('faker');
const moment = require('moment');

const AuthService = require('../../modules/authService');
const AuthTestHelper = require('./helpers/auth');
const AuthFixture = require('./../fixtures/auth');
const { VALUES } = require('../../constants/auth');
const setup = require('./setup');
const { expect } = require('chai');

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
			} catch (error) {
				expect(error).to.have.property('message', 'jwt malformed');
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
			} catch (error) {
				expect(error).to.have.property('message', 'jwt malformed');
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

		it('should throw error if email is not valid', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: faker.random.word(),
					password: faker.internet.password(),
				});
			} catch (error) {
				expect(error).to.have.property(
					'message',
					'"email" must be a valid email'
				);
			}
		});

		it('should throw error if email does not exist', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: faker.internet.email(),
					password: this.user1_data.password,
				});
			} catch (error) {
				expect(error).to.have.property(
					'message',
					'"email" does not exist'
				);
			}
		});

		it('should throw error if password length is less than 8 characters', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(7),
				});
			} catch (error) {
				expect(error).to.have.property(
					'message',
					'"password" length must be at least 8 characters long'
				);
			}
		});

		it('should throw error if password length is greater than 21 characters', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(21),
				});
			} catch (error) {
				expect(error).to.have.property(
					'message',
					'"password" length must be less than or equal to 20 characters long'
				);
			}
		});

		it('should throw error if password is not valid', async function () {
			try {
				await AuthService.getUserSignedTokens({
					email: this.user1_data.email,
					password: faker.internet.password(8),
				});
			} catch (error) {
				expect(error).to.have.property(
					'message',
					'"password" does not match'
				);
			}
		});
	});
});
