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
      }, 
      {
        model: models.Project,
        attributes: ['name']
      }]
  	});
}

function findKompilesByEmail(email) {
  return models.Kompile.findAll({
      order: [['createdAt', 'ASC']],
      include: [{
        model: models.User,
        attributes: ['email'],
        where: {
          email : email
        }
      },
      {
        model: models.Project,
        attributes: ['name']
      }]
    });
}

function findKompilesByEmailAndProject(email, project) {
  return models.Kompile.findAll({
      order: [['createdAt', 'ASC']],
      include: [{
        model: models.User,
        attributes: ['email'],
        where: {
          email : email
        }
      },
      {
        model: models.Project,
        attributes: ['name'],
        where: {
          name: project
        }
      }]
    });
}

function findKompilesByProject(project) {
  return models.Kompile.findAll({
      order: [['createdAt', 'ASC']],
      include: [{
        model: models.User,
        attributes: ['email']
      },
      {
        model: models.Project,
        attributes: ['name'],
        where: {
          name: project
        }
      }]
    });
}

function saveKompileByUserId(userId, kompile) {
  return models.Kompile.create({
            UserId: userId,
            project: kompile.project,
            duration: kompile.duration
          }).then(kompile => {
            return models.Kompile.findOne({
              where: {
                id: kompile.id
              },
              include: [{
                model: models.User,
                attributes: ['email']
              }]
            })
          });
}

function saveKompile(kompile) {
  return models.User.findOrCreate({
    where: {
      email: kompile.user
    },
    defaults: {
      alias: kompile.alias
    }
  }).spread((user, created) => {
    console.log('User')
    console.log(created)
    return models.Project.findOrCreate({
      where: {
        name: kompile.project
      }
    }).spread((project, created) => {
      console.log('Project')
      console.log(created)
      return models.Kompile.create({
            UserId: user.id,
            ProjectId: project.id,
            duration: kompile.duration
          }).then(kompile => {
            return models.Kompile.findOne({
              where: {
                id: kompile.id
              },
              include: [{
                model: models.User,
                attributes: ['email']
              }, {
                model: models.Project,
                attributes: ['name']
              }
              ]
            })
          });
    });
  });
}

module.exports = {
  findKompilesByUserId: findKompilesByUserId,
  findKompilesByEmail: findKompilesByEmail,
  findKompilesByProject: findKompilesByProject,
  findKompilesByEmailAndProject: findKompilesByEmailAndProject,
  saveKompile: saveKompile
};