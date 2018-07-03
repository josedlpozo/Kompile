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

function find(email) {
	return new Promise((resolve, reject) => {
		if (!email) reject(error.createError(400, 'email is required'))
		userRepository.find(email).then(user => resolve(userMapper.mapUser(user))).catch(err => reject(err));
	});
}

module.exports = {
	findBy: findBy,
	find: find
}