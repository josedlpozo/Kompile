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
  console.log(kompile)
  return models.User.findOrCreate({
    where: {
      email: kompile.user
    },
    defaults: {
      alias: kompile.alias
    }
  }).spread((user, created) => {
    return models.Project.findOrCreate({
      where: {
        name: kompile.project
      }
    }).spread((project, created) => {
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

function averageByEmail(email) {
    return models.Kompile.findAll({
      attributes: ['id', 'createdAt', [models.sequelize.fn('AVG', models.sequelize.col('duration')), 'duration']],
      group: ['UserId', 'ProjectId'],
      include: [{
        model: models.User,
        attributes: ['alias', 'email'],
        where: {
            email: email
        }
      }, {
        model: models.Project,
        attributes: ['name']
      }]
    });
}

function averageByProject(project) {
    return models.Kompile.findAll({
      attributes: ['id', 'createdAt', [models.sequelize.fn('AVG', models.sequelize.col('duration')), 'duration']],
      group: ['UserId', 'ProjectId'],
      include: [{
        model: models.User,
        attributes: ['alias', 'email']
      }, {
        model: models.Project,
        attributes: ['name'],
        where: {
            name: project
        }
      }]
    });
}

function sumByEmail(email) {
    return models.Kompile.findAll({
      attributes: ['id', 'createdAt', [models.sequelize.fn('SUM', models.sequelize.col('duration')), 'duration']],
      group: ['UserId', 'ProjectId'],
      include: [{
        model: models.User,
        attributes: ['alias', 'email'],
        where: {
            email: email
        }
      }, {
        model: models.Project,
        attributes: ['name']
      }]
    });
}

function sumByProject(project) {
    return models.Kompile.findAll({
      attributes: ['id', 'createdAt', [models.sequelize.fn('SUM', models.sequelize.col('duration')), 'duration']],
      group: ['UserId', 'ProjectId'],
      include: [{
        model: models.User,
        attributes: ['alias', 'email']
      }, {
        model: models.Project,
        attributes: ['name'],
        where: {
            name: project
        }
      }]
    });
}


module.exports = {
  findKompilesByUserId: findKompilesByUserId,
  findKompilesByEmail: findKompilesByEmail,
  findKompilesByProject: findKompilesByProject,
  findKompilesByEmailAndProject: findKompilesByEmailAndProject,
  averageByEmail: averageByEmail,
  averageByProject: averageByProject,
  sumByEmail: sumByEmail,
  sumByProject: sumByProject,
  saveKompile: saveKompile
};