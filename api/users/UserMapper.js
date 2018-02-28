'use strict';

var _ = require('underscore');

function mapUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    alias: user.alias,
    email: user.email,
  };
}

function mapUsers(users) {
  if (!users) return null;

  var savedUsers = _.map(users, user => mapUser(user));

  return savedUsers;
}

module.exports = {
  mapUsers: mapUsers
}