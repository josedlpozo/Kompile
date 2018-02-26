'use strict';

module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {

    name: DataTypes.STRING

  });

  Project.associate = function (models) {
    models.Project.hasMany(models.Kompile);
  };

  return Project;
};