'use strict';

class CustomError extends Error {
	constructor({ name, message, code = 400 } = {}) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = name || this.constructor.name;
		this.message = message;
		this.code = code;
	}
}

module.exports = CustomError;
