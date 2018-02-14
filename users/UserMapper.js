'use strict';

var _ = require('underscore');

function mapUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    alias: user.alias,
    language: user.language
  };
}

function mapUsers(users) {
  if (!users) return null;

  var savedUsers = _.map(users, user => mapUser(user));

  return savedUsers;
}

module.exports = {
  mapUser: mapUser,
  mapUsers: mapUsers
};