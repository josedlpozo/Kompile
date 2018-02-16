'use strict';

module.exports = (sequelize, DataTypes) => {
  var Kompile = sequelize.define('Kompile', {
    
    duration: DataTypes.DOUBLE

  });

  Kompile.associate = function (models) {
    models.Kompile.belongsTo(models.User);
  };

  return Kompile;
};