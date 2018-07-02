'use strict';

var _ = require('underscore')
var projectRepository = require('./ProjectRepository');
var projectMapper = require('./ProjectMapper');
var error = require('./../commons/Error');

function findBy(prefix) {
	return new Promise((resolve, reject) => {
		if (!prefix) reject(error.createError(400, 'prefix is required'))
		projectRepository.findBy(prefix)
		.then(projects => resolve(projectMapper.mapProjects(projects)))
		.catch(err => reject(err));
	});
}

function find(name) {
	return new Promise((resolve, reject) => {
		if (!name) reject(error.createError(400, 'name is required'))
		projectRepository.find(name)
		.then(project => resolve(projectMapper.mapProject(project)))
		.catch(err => reject(err));
	});
}

module.exports = {
	findBy: findBy,
	find: find
}