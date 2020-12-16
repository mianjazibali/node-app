const request = require('supertest');
const { expect } = require('chai');

const app = require('../../server.js');
const setup = require('../modules/setup');
const UserTestHelper = require('../modules/helpers/user');
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
			UserTestHelper.verifyUser(response.user, this.user1_data);
		});

		it('should not get user profile if user is not logged in', async function () {
			const response = await request(app)
				.get('/api/user/profile')
				.expect(500);

			expect(response).to.have.property('text', ERRORS.INVALID_TOKEN);
		});
	});
});
