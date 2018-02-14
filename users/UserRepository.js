'use strict';

var models = require('../models');

function findByEmail(email) {
  return models.User.findOne({
    where: {
      email: email
    }
  });
}

function get(email, password) {
  return models.User.findOne({
    where: {
      email: email,
      password: password
    }
  });
}

function findAll() {
  return models.User.findAll();
}

function findById(userId) {
	return models.User.findOne({
    	where: {
      		id: userId
    	}
  	});
}

function saveUser(user) {
	return models.User.create({
		language: user.language,
		email: user.email,
		alias: user.alias,
		password: user.password,
		group: user.group
	});
}

module.exports = {
  findByEmail: findByEmail,
  get: get,
  saveUser: saveUser,
  findAll: findAll
};