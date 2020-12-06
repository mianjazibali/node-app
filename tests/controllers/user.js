const request = require('supertest');
const { expect } = require('chai');
const _ = require('lodash');

const app = require('../../server.js');
const setup = require('../modules/setup');
const helpers = require('../../tests/modules/helpers');

describe('User API', function () {
	setup.registerHooks();

	describe('Get All Users', function () {
		it('should show all users', async function () {
			const { body } = await request(app).get('/api').expect(200);

			expect(body).to.have.property('users');
			expect(body.users).to.be.an('array');
			expect(body.users.length).to.be.equal(1);

			const user = _.first(body.users);
			expect(user.id).to.be.equal(this.user1.id);
			helpers.user.verifyUser(user, this.user1);

			expect(user.items).to.be.an('array');
			expect(user.items.length).to.be.equal(1);

			const userItem = _.first(user.items);
			expect(userItem.id).to.be.equal(this.user1_item1.id);
			helpers.item.verifyItem(userItem, this.user1_item1);
		});
	});
});
