'use strict';

function createError(status, message) {
	return {
		status: status,
		message: message
	}
}

function unknownError(error) {
	return {
		status: 500,
		message: error
	}
}

module.exports = {
	createError: createError,
	unknownError: unknownError
}