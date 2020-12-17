const _ = require('lodash');
const { expect } = require('chai');

const verifyCustomError = ({ error, message, length = 1 } = {}) => {
	expect(error).to.have.property('errors');
	expect(error.errors).to.be.an('array').that.has.lengthOf(length);
	expect(_.first(error.errors)).to.have.property('message', message);
};

const createResponseData = ({ status = 500, data = null, message } = {}) => {
	return {
		status,
		data,
		message,
	};
};

const verifyResponseError = ({ actualError, expectedError } = {}) => {
	expect(actualError).to.have.property('status', expectedError.status);
	expect(actualError).to.have.property('data', expectedError.data);
	expect(actualError).to.have.property('message', expectedError.message);
};

module.exports = {
	verifyCustomError,
	createResponseData,
	verifyResponseError,
};
