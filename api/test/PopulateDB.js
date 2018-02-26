'use strict';

let models = require('../models')

function populateDB(done) {
  models.sequelize.sync({
    force: true
  }).then(() => {
    models.User.create({
        alias: 'kompiler-developer',
        email: 'kompiler@info.com'
    }).then(user => {
        models.Project.create({
          name: 'kompiler-api'
    }).then(project => {
      models.Kompile.create({
            UserId: user.id,
            ProjectId: project.id,
            duration: 200
      }).then(kompile => {
        models.Kompile.create({
            UserId: user.id,
            ProjectId: project.id,
            duration: 100
        }).then(kompile => done())
      });
    });
    })
  })
}

function clearDB(done) {
  models.sequelize.sync({
    force: true
  }).then(() => {
    models.Kompile.destroy({
      where:{},
      truncate: true
    }).then(() => {
      models.User.destroy({
        where:{},
        truncate: true
      }).then(() => done())
    })
  })
}

module.exports = {
  populateDB: populateDB,
  clearDB: clearDB
}