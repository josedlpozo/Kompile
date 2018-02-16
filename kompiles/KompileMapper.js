'use strict';

var _ = require('underscore');

function mapKompile(kompile) {
  if (!kompile) return null;

  return {
    id: kompile.id,
    duration: kompile.duration
  };
}

function mapKompiles(kompiles) {
  if (!kompiles) return null;
  console.log(kompiles)
  var savedKompiles = _.map(kompiles, kompile => mapKompile(kompile));

  return savedKompiles;
}

module.exports = {
  mapKompile: mapKompile,
  mapKompiles: mapKompiles
};