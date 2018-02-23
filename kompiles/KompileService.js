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
  if (!email && !project) return userOrEmailRequired()
  else if (!email) return retrieveKompilesByProject(project)
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
      if (!kompile.duration || kompile.duration == 0) reject("Duration is not present")
      else if(!kompile.user) reject("User is not present")
    	else kompileRepository.saveKompile(kompile)
      	.then(kompile => {
        	resolve(kompileMapper.mapKompile(kompile));
      	})
      	.catch(err => reject(err));
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

function calculateKompileTimeMeanByEmail(email) {
  return new Promise((resolve, reject) => {
      retrieveKompilesByEmail(email)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageUser(email, average))
      }).catch(err => reject(err));
  });
}

function calculateKompileTimeMeanByProject(project) {
  return new Promise((resolve, reject) => {
      retrieveKompilesByProject(project)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageProject(project, average))
      }).catch(err => reject(err));
  });
}

function userOrEmailRequired() {
  return new Promise((resolve, reject) => {
      reject("User or Project is required")
  });
}

function calculateKompileTimeMeanByEmailAndProject(email, project) {
  if (!email && !project) return userOrEmailRequired()
  else if(!email) return calculateKompileTimeMeanByProject(project)
  else if (!project) return calculateKompileTimeMeanByEmail(email)
  else return new Promise((resolve, reject) => {
      retrieveKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        let average = calculateAverage(kompiles)
        resolve(kompileMapper.mapAverageUserProject(project, email, average))
      }).catch(err => reject(err));
  });
}

module.exports = {
	retrieveKompiles: retrieveKompiles,
  retrieveKompilesByEmail: retrieveKompilesByEmail,
  retrieveKompilesByProject: retrieveKompilesByProject,
  retrieveKompilesByEmailAndProject : retrieveKompilesByEmailAndProject,
  calculateKompileTimeMeanByEmailAndProject : calculateKompileTimeMeanByEmailAndProject,
	saveKompile: saveKompile
}