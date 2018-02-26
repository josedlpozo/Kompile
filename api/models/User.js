'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {

    alias: DataTypes.STRING,

    email: { type: DataTypes.STRING, allowNull: false, unique: true },

    password: { type: DataTypes.STRING, allowNull: false, defaultValue: "default" },

  });

  User.associate = function (models) {
    models.User.hasMany(models.Kompile);
  };

  return User;
};