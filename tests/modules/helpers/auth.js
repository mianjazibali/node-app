const { expect } = require('chai');

const verifyTokenPayload = ({ actualPayload, expectedPayload } = {}) => {
	expect(actualPayload).to.have.property('aud', expectedPayload.aud);
	expect(actualPayload).to.have.property('iat');
	expect(actualPayload.iat).to.be.closeTo(expectedPayload.iat, 10);
	expect(actualPayload).to.have.property('exp');
	expect(actualPayload.exp).to.be.closeTo(expectedPayload.exp, 10);
};

module.exports = {
	verifyTokenPayload,
};
