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

function mapKompileAverage(kompile) {
  if (!kompile) return null;

  let epoch = new Date(kompile.createdAt).getTime()
  
  return {
    id: kompile.id,
    average: kompile.duration,
    project: kompile.Project.name,
    createdAt: epoch,
    user: kompile.User.email
  };
}

function mapKompilesAverage(kompiles) {
  if (!kompiles) return null;

  var savedKompiles = _.map(kompiles, kompile => mapKompileAverage(kompile));

  return savedKompiles;
}

function mapKompileSum(kompile) {
  if (!kompile) return null;

  let epoch = new Date(kompile.createdAt).getTime()
  
  return {
    id: kompile.id,
    sum: kompile.duration,
    project: kompile.Project.name,
    createdAt: epoch,
    user: kompile.User.email
  };
}

function mapKompilesSum(kompiles) {
  if (!kompiles) return null;

  var savedKompiles = _.map(kompiles, kompile => mapKompileSum(kompile));

  return savedKompiles;
}

function mapAverageSummaryUser(user, average) {
  return {
    user: user,
    average: average
  }
}

function mapAverageSummaryProject(project, average) {
  return {
    project: project,
    average: average
  }
}

function mapAverageSummaryUserProject(project, user, average) {
  return {
    project: project,
    user: user,
    average: average
  }
}

module.exports = {
  mapKompile: mapKompile,
  mapKompiles: mapKompiles,
  mapKompilesAverage: mapKompilesAverage,
  mapKompilesSum: mapKompilesSum,
  mapAverageSummaryUser: mapAverageSummaryUser,
  mapAverageSummaryProject: mapAverageSummaryProject,
  mapAverageSummaryUserProject: mapAverageSummaryUserProject
};