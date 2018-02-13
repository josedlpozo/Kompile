'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {

    language: DataTypes.STRING,

    alias: DataTypes.STRING,

    password: DataTypes.STRING,

    group: DataTypes.STRING

  });

  return User;
};