'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {

    language: DataTypes.STRING,

    alias: DataTypes.STRING,

    email: { type: DataTypes.STRING, allowNull: false, defaultValue: true, primaryKey: true },

    password: DataTypes.STRING,

    group: DataTypes.STRING

  });

  User.associate = function (models) {
    models.User.hasMany(models.Kompile, {foreignKey: 'id', sourceKey: 'email'});
  };

  return User;
};