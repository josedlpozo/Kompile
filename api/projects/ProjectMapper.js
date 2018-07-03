'use strict';

var _ = require('underscore');

function mapProject(project) {
  if (!project) return null;

  return {
    id: project.id,
    name: project.name
  };
}

function mapProjects(projects) {
  if (!projects) return null;

  var savedProjects = _.map(projects, project => mapProject(project));

  return savedProjects;
}

module.exports = {
  mapProjects: mapProjects,
  mapProject: mapProject
}