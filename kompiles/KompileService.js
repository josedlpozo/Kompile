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

function retrieveKompilesByEmailAndProject(email, project) {
  if (!email) return retrieveKompilesByProject(project)
  else if (!project) return retrieveKompilesByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject({ error: 404 })
        else resolve(kompileMapper.mapKompiles(kompiles));
      }).catch(err => reject(err));
  });
}

function retrieveKompilesByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmail(email)
        .then(kompiles => {
          if (!kompiles || kompiles.length == 0) reject({ error: 404 })
          else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function retrieveKompilesByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByProject(project)
        .then(kompiles => {
        	if (!kompiles || kompiles.length == 0) reject({ error: 404 })
        	else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function saveKompile(kompile) {
	return new Promise((resolve, reject) => {
      	if (!kompile.duration) reject("Duration is not present")
      	else if(!kompile.user) reject("User is not present")
    	kompileRepository.saveKompile(kompile)
      	.then(kompile => {
        	resolve(kompileMapper.mapKompile(kompile));
      	})
      	.catch(err => reject(err));
  	});
}

module.exports = {
	retrieveKompiles: retrieveKompiles,
  retrieveKompilesByEmail: retrieveKompilesByEmail,
  retrieveKompilesByProject: retrieveKompilesByProject,
  retrieveKompilesByEmailAndProject : retrieveKompilesByEmailAndProject,
	saveKompile: saveKompile
}