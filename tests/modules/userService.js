require('../../server.js');

const { expect } = require('chai');
const _ = require('lodash');

const UserService = require('../../modules/userService');
const setup = require('./setup');
const helpers = require('./helpers');

describe('User Service', function () {
	setup.registerHooks();

	describe('Get All Users', function () {
		it('should show all users', async function () {
			const users = await UserService.getAllUsers();

			expect(users).to.be.an('array');
			expect(users.length).to.be.equal(1);

			const user = _.first(users);
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
