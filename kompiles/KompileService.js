'use strict';

var _ = require('underscore')
var kompileRepository = require('./KompileRepository');
var kompileMapper = require('./KompileMapper');

function retrieveKompiles(userId) {
	return new Promise((resolve, reject) => {
    	kompileRepository.findKompilesByUserId(userId)
      	.then(kompiles => {
        	resolve(kompileMapper.mapKompiles(kompiles));
      	})
      	.catch(err => reject(err));
  	});
}

function retrieveKompilesByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmail(email)
        .then(kompiles => {
          resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function retrieveKompilesByGroup(group) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByGroup(group)
        .then(kompilesByUser => {
          resolve(_.map(kompilesByUser, kompiles=> kompileMapper.mapKompiles(kompiles)));
        })
        .catch(err => reject(err));
    });
}

function saveKompile(userId, kompile) {
	return new Promise((resolve, reject) => {
    	kompileRepository.saveKompile(userId, kompile)
      	.then(kompile => {
        	resolve(kompileMapper.mapKompile(kompile));
      	})
      	.catch(err => reject(err));
  	});
}

module.exports = {
	retrieveKompiles: retrieveKompiles,
  retrieveKompilesByEmail: retrieveKompilesByEmail,
  retrieveKompilesByGroup: retrieveKompilesByGroup,
	saveKompile: saveKompile
}