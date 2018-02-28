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

module.exports = {
	findBy: findBy
}