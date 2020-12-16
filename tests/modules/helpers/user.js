const moment = require('moment');
const { expect } = require('chai');

const verifyUser = (actualUser, expectedUser) => {
	expect(actualUser).to.have.property('firstName', expectedUser.firstName);
	expect(actualUser).to.have.property('lastName', expectedUser.lastName);
	expect(actualUser).to.have.property('email', expectedUser.email);
	expect(actualUser).to.have.property('createdAt');
	expect(moment(actualUser.createdAt).unix()).to.be.closeTo(
		moment(expectedUser.createdAt).unix(),
		10
	);
	expect(actualUser).to.have.property('updatedAt');
	expect(moment(actualUser.updatedAt).unix()).to.be.closeTo(
		moment(expectedUser.updatedAt).unix(),
		10
	);
};

module.exports = {
	verifyUser,
};
