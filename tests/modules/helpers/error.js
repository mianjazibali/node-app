const { expect } = require('chai');

const verifyCustomError = ({ error, length = 2, index = 1, message } = {}) => {
	expect(error).to.have.property('errors');
	expect(error.errors).to.be.an('array').that.has.lengthOf(length);
	expect(error.errors[index]).to.have.property('message', message);
};

module.exports = {
	verifyCustomError,
};
