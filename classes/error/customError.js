'use strict';

class CustomError extends Error {
	constructor({ name, message, statusCode = 400 } = {}) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = name || this.constructor.name;
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = CustomError;
