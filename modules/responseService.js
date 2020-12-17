const _ = require('lodash');

const createResponseData = ({
	status = 200,
	data = null,
	message = null,
} = {}) => {
	return {
		status,
		data,
		message,
	};
};

const sendError = ({ res, err } = {}) => {
	const statusCode =
		err.errors && _.first(err.errors).original
			? _.first(err.errors).original.statusCode
			: err.statusCode || 500;
	const message = err.errors ? _.first(err.errors).message : err.message;
	const responseData = createResponseData({ status: statusCode, message });
	return res.status(statusCode).json(responseData);
};

module.exports = {
	sendError,
};
