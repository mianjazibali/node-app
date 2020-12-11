const moment = require('moment');
const { expect } = require('chai');

const verifyItem = (actualItem, expectedItem) => {
	expect(actualItem).to.have.property('title', expectedItem.title);
	expect(actualItem).to.have.property('userId', expectedItem.userId);
	expect(actualItem).to.have.property('createdAt');
	expect(moment(actualItem.createdAt).unix()).to.be.closeTo(
		moment(expectedItem.createdAt).unix(),
		10
	);
	expect(actualItem).to.have.property('updatedAt');
	expect(moment(actualItem.updatedAt).unix()).to.be.closeTo(
		moment(expectedItem.updatedAt).unix(),
		10
	);
};

module.exports = {
	verifyItem,
};
