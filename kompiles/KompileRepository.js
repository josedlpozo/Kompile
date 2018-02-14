'use strict';

var models = require('../models');

function findKompilesByUserId(userId) {
	return models.Kompile.findAll({
    	where: {
      		'user.id' : userId
    	},
    	include: [
    		{ model: models.User, as: models.User.tableName }
    	]
  	});
}

function saveKompile(userId, Kompile) {
	return models.User.findOne({
    	where: {
      		id : userId
    	}
  	}).then(user => {
  		resolve(models.Kompile.create({
			user: user,
			duration: duration
		}))
  	});
}

module.exports = {
  findKompilesByUserId: findKompilesByUserId,
  saveKompile: saveKompile
};