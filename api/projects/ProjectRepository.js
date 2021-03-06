'use strict';

var models = require('../models');
var _ = require('underscore');

function findBy(prefix) {
	return models.Project.findAll({
		where: {
			name: {
				$like : '%' + prefix + '%'
			}
		}
	});
}

function find(name) {
	return models.Project.find({
		where: {
			name: name
		}
	});
}

function create(name) {
	return models.Project.create({
		name: name
	})
}

module.exports = {
	findBy: findBy,
	find: find,
	create: create
}