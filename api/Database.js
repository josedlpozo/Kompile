'use strict';

var models = require('./models');

function connect() {
  return models.sequelize.sync();
}

module.exports = {
  'connect': connect
};