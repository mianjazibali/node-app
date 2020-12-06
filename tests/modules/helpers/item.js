const moment = require('moment');
const { expect } = require('chai');

const verifyItem = (actualItem, expectedItem) => {
	expect(actualItem.title).to.be.equal(expectedItem.title);
	expect(actualItem.userId).to.be.equal(expectedItem.userId);
	expect(moment(actualItem.createdAt).unix()).to.be.closeTo(
		moment(expectedItem.createdAt).unix(),
		10
	);
	expect(moment(actualItem.updatedAt).unix()).to.be.closeTo(
		moment(expectedItem.updatedAt).unix(),
		10
	);
};

module.exports = {
	verifyItem,
};
