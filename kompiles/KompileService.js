'use strict';

var _ = require('underscore')
var kompileRepository = require('./KompileRepository');
var kompileMapper = require('./KompileMapper');

function createError(status, message) {
	return {
		status: status,
		message: message
	}
}

function emailOrProjectIsRequired() {
  return new Promise((resolve, reject) => {
      reject(createError(400, 'user or projectis required'))
  });
}

function calculateAverage(kompiles) {
  if (!kompiles || kompiles.length == 0) return 0
  let durations = _.map(kompiles, kompile => kompile.duration)
  let totalDuration = durations.reduce(function(acc, item) {
    return acc + item
  }, 0);
  return totalDuration / durations.length
}

function retrieveKompilesByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if (!email) return retrieveKompilesByProject(project)
  else if (!project) return retrieveKompilesByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + email + ' email and project ' + project))
        else resolve(kompileMapper.mapKompiles(kompiles));
      }).catch(err => reject(err));
  });
}

function retrieveKompilesByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmail(email)
        .then(kompiles => {
          if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + email + ' email'))
          else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function retrieveKompilesByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByProject(project)
        .then(kompiles => {
        	if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + project + ' project'))
        	else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function saveKompile(kompile) {
	return new Promise((resolve, reject) => {
      	if (!kompile.duration || kompile.duration == 0) reject(createError(400, 'Duration is required'))
      	else if(!kompile.user) reject(createError(400, 'User is required'))
    	else kompileRepository.saveKompile(kompile)
      		.then(kompile => resolve(kompileMapper.mapKompile(kompile)))
      		.catch(err => reject(err));
  	});
}

function calculateKompileTimeAverageByEmail(email) {
  return new Promise((resolve, reject) => {
      retrieveKompilesByEmail(email)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageUser(email, average))
      }).catch(err => reject(err));
  });
}

function calculateKompileTimeAverageByProject(project) {
  return new Promise((resolve, reject) => {
      retrieveKompilesByProject(project)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageProject(project, average))
      }).catch(err => reject(err));
  });
}

function calculateKompileTimeAverageByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if(!email) return calculateKompileTimeAverageByProject(project)
  else if (!project) return calculateKompileTimeAverageByEmail(email)
  else return new Promise((resolve, reject) => {
      retrieveKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageUserProject(project, email, average))
      }).catch(err => reject(err));
  });
}

module.exports = {
  	retrieveKompilesByEmail: retrieveKompilesByEmail,
  	retrieveKompilesByProject: retrieveKompilesByProject,
  	retrieveKompilesByEmailAndProject : retrieveKompilesByEmailAndProject,
  	calculateKompileTimeAverageByEmailAndProject : calculateKompileTimeAverageByEmailAndProject,
	saveKompile: saveKompile
}