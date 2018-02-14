'use strict';

module.exports = (sequelize, DataTypes) => {
  var Kompile = sequelize.define('Kompile', {
    
    duration: DataTypes.DOUBLE

  });

  return Kompile;
};