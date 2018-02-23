'use strict';

var _ = require('underscore');

function mapKompile(kompile) {
  if (!kompile) return null;

  let epoch = new Date(kompile.createdAt).getTime()

  return {
    id: kompile.id,
    duration: kompile.duration,
    project: kompile.project,
    createdAt: epoch,
    user: kompile.User.email
  };
}

function mapKompiles(kompiles) {
  if (!kompiles) return null;

  var savedKompiles = _.map(kompiles, kompile => mapKompile(kompile));

  return savedKompiles;
}

function mapAverageUser(user, average) {
  return {
    user: user,
    average: average
  }
}

function mapAverageProject(project, average) {
  return {
    project: project,
    average: average
  }
}

function mapAverageUserProject(project, user, average) {
  return {
    project: project,
    user: user,
    average: average
  }
}

module.exports = {
  mapKompile: mapKompile,
  mapKompiles: mapKompiles,
  mapAverageUser: mapAverageUser,
  mapAverageProject: mapAverageProject,
  mapAverageUserProject: mapAverageUserProject
};