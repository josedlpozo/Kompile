'use strict';

function createError(status, message) {
	return {
		status: status,
		message: message
	}
}

module.exports = {
	createError: createError
}