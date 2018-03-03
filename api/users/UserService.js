'use strict';

var _ = require('underscore')
var userRepository = require('./UserRepository');
var userMapper = require('./UserMapper');
var error = require('./../commons/Error');

function findBy(prefix) {
	return new Promise((resolve, reject) => {
		if (!prefix) reject(error.createError(400, 'prefix is required'))
		userRepository.findBy(prefix)
		.then(users => resolve(userMapper.mapUsers(users)))
		.catch(err => reject(err));
	});
}

module.exports = {
	findBy: findBy
}