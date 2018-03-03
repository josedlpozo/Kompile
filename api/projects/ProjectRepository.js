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

module.exports = {
	findBy: findBy
}