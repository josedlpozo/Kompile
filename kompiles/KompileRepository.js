'use strict';

var models = require('../models');
var _ = require('underscore');

function findKompilesByUserId(userId) {
	return models.Kompile.findAll({
      include: [{
        model: models.User,
        attributes: ['email'],
        where: {
          id : userId
        }
      }]
  	});
}

function findKompilesByEmail(email) {
  return models.Kompile.findAll({
      include: [{
        model: models.User,
        attributes: ['email'],
        where: {
          email : email
        }
      }]
    });
}

function findKompilesByProject(project) {
  return models.Kompile.findAll({
      where: {
        project: project
      },
      include: [{
        model: models.User,
        attributes: ['email']
      }]
    });
}

function saveKompileByUserId(userId, kompile) {
  return models.Kompile.create({
            UserId: userId,
            project: kompile.project,
            duration: kompile.duration
          })
}

function saveKompile(kompile) {
	return models.User.findOne({
    	where: {
      		email : kompile.user
    	}
  	}).then(user => {
      if (!user) {
        models.User.create({
          alias: kompile.user,
          email: kompile.user
        }).then(user => {
          saveKompileByUserId(user.id, kompile)
        })
      } else {
        saveKompileByUserId(user.id, kompile)
      }
    });
}

module.exports = {
  findKompilesByUserId: findKompilesByUserId,
  findKompilesByEmail: findKompilesByEmail,
  findKompilesByProject: findKompilesByProject,
  saveKompile: saveKompile
};