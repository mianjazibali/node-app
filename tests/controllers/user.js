const request = require('supertest');
const { expect } = require('chai');

const app = require('../../server.js');
const setup = require('../modules/setup');
const UserTestHelper = require('../modules/helpers/user');
const ErrorTestHelper = require('../modules/helpers/error');
const { ERRORS } = require('../../constants/auth');

describe('User Controller Tests', function () {
	setup.registerHooks();

	describe('Get User Profile', async function () {
		it('should get user profile', async function () {
			const { body: response } = await request(app)
				.get('/api/user/profile')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${this.user1.tokens.accessToken}`)
				.expect(200);

			expect(response.user).to.have.property('uuid', this.user1.uuid);
			UserTestHelper.verifyUser({
				actualUser: response.user,
				expectedUser: this.user1_data,
			});
		});

		it('should not get user profile if user is not logged in', async function () {
			const statusCode = 400;

			const { body: actualResponse } = await request(app)
				.get('/api/user/profile')
				.set('Accept', 'application/json')
				.expect(statusCode);

			const expectedResponse = ErrorTestHelper.createResponseData({
				status: statusCode,
				message: ERRORS.TOKEN.INVALID,
			});
			ErrorTestHelper.verifyResponseError({
				actualError: actualResponse,
				expectedError: expectedResponse,
			});
		});
	});
});
