'use strict';

var _ = require('underscore')
var kompileRepository = require('./KompileRepository');
var kompileMapper = require('./KompileMapper');
var error = require('./../commons/Error');

function emailOrProjectIsRequired() {
  return new Promise((resolve, reject) => {
      reject(error.createError(400, 'user or project is required'))
  });
}

function emailOrProjectIsRequiredNotBoth() {
  return new Promise((resolve, reject) => {
      reject(error.createError(400, 'user or project is required but not both'))
  });
}

function orderDesc(kompiles) {
  return kompiles.sort((sort, other) => other.duration - sort.duration);
}

function retrieveKompilesByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if (!email) return retrieveKompilesByProject(project)
  else if (!project) return retrieveKompilesByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        if (!kompiles) reject(error.createError(404, 'Kompiles not found filtering by ' + email + ' email and project ' + project))
        else resolve(kompileMapper.mapKompiles(kompiles));
      }).catch(err => reject(error.unknownError(err)));
  });
}

function retrieveKompilesByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmail(email)
        .then(kompiles => {
          if (!kompiles) reject(error.createError(404, 'Kompiles not found filtering by ' + email + ' email'))
          else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(error.unknownError(err)));
    });
}

function retrieveKompilesByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByProject(project)
        .then(kompiles => {
        	if (!kompiles) reject(error.createError(404, 'Kompiles not found filtering by ' + project + ' project'))
        	else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(error.unknownError(err)));
    });
}

function saveKompile(kompile) {
	return new Promise((resolve, reject) => {
      if (!kompile.duration || kompile.duration == 0) reject(error.createError(400, 'duration is required'))
      else if(!kompile.user) reject(error.createError(400, 'user is required'))
      else if(!kompile.project) reject(error.createError(400, 'project is required'))
    	else kompileRepository.saveKompile(kompile)
      		.then(kompile => resolve(kompileMapper.mapKompile(kompile)))
      		.catch(err => reject(error.unknownError(err)));
  	});
}

module.exports = {
  	retrieveKompilesByEmail: retrieveKompilesByEmail,
  	retrieveKompilesByProject: retrieveKompilesByProject,
  	retrieveKompilesByEmailAndProject : retrieveKompilesByEmailAndProject,
	  saveKompile: saveKompile
}