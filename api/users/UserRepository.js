'use strict';

var models = require('../models');
var _ = require('underscore');

function findBy(prefix) {
	return models.User.findAll({
		where: {
			email: {
				$like : '%' + prefix + '%'
			}
		}
	});
}

function find(email) {
	return models.User.find({
		where: {
			email: email
		}
	});
}

module.exports = {
	findBy: findBy,
	find: find
}