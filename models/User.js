'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {

    language: DataTypes.STRING,

    alias: DataTypes.STRING,

    email: { type: DataTypes.STRING, allowNull: false, unique: true },

    password: DataTypes.STRING,

    group: DataTypes.STRING

  });

  User.associate = function (models) {
    models.User.hasMany(models.Kompile);
  };

  return User;
};