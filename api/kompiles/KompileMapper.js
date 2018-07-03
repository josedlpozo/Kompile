'use strict';

var _ = require('underscore');

function mapKompile(kompile) {
  if (!kompile) return null;

  let epoch = new Date(kompile.createdAt).getTime()

  return {
    id: kompile.id,
    duration: kompile.duration,
    project: kompile.Project.name,
    createdAt: epoch,
    user: kompile.User.email
  };
}

function mapKompiles(kompiles) {
  if (!kompiles) return null;

  var savedKompiles = _.map(kompiles, kompile => mapKompile(kompile));

  return savedKompiles;
}

module.exports = {
  mapKompile: mapKompile,
  mapKompiles: mapKompiles
};