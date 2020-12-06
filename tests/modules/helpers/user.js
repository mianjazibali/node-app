const moment = require('moment');
const { expect } = require('chai');

const verifyUser = (actualUser, expectedUser) => {
	expect(actualUser.firstName).to.be.equal(expectedUser.firstName);
	expect(actualUser.lastName).to.be.equal(expectedUser.lastName);
	expect(actualUser.email).to.be.equal(expectedUser.email);
	expect(actualUser.password).to.be.equal(expectedUser.password);
	expect(moment(actualUser.createdAt).unix()).to.be.closeTo(
		moment(expectedUser.createdAt).unix(),
		10
	);
	expect(moment(actualUser.updatedAt).unix()).to.be.closeTo(
		moment(expectedUser.updatedAt).unix(),
		10
	);
};

module.exports = {
	verifyUser,
};
