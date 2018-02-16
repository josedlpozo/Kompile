'use strict';

var userRepository = require('./UserRepository');
var userMapper = require('./UserMapper');

function retrieveUser(email) {
	return new Promise((resolve, reject) => {
    	userRepository.findByEmail(email)
      	.then(user => {
        	resolve(userMapper.mapUser(user));
      	})
      	.catch(err => reject(err));
  	});
}

function retrieveById(userId) {
	return new Promise((resolve, reject) => {
    	userRepository.findById(userId)
      	.then(user => {
        	resolve(userMapper.mapUser(user));
      	})
      	.catch(err => reject(err));
  	});
}

function retrieveUsers() {
	return new Promise((resolve, reject) => {
    	userRepository.findAll()
      	.then(users => {
        	resolve(userMapper.mapUsers(users));
      	})
      	.catch(err => reject(err));
  	});
}

function saveUser(user) {
	return new Promise((resolve, reject) => {
    	userRepository.saveUser(user)
      	.then(user => {
        	resolve(userMapper.mapUser(user));
      	})
      	.catch(err => {
      		if (err.fields && err.fields.indexOf('email') > -1) reject('Already exists a user with this email')
      		else reject(err);
      	});
  	});
}

function getUser(email, password) {
  return new Promise((resolve, reject) => {
      userRepository.get(email, password)
        .then(user => {
          resolve(userMapper.mapUser(user));
        })
        .catch(err => {
          if (err.fields.indexOf('email') > -1) reject('Already exists a user with this email')
          else reject(err);
        });
    });
}

module.exports = {
	retrieveUser: retrieveUser,
	retrieveUsers: retrieveUsers,
	retrieveById: retrieveById,
  getUser: getUser,
	saveUser: saveUser
}