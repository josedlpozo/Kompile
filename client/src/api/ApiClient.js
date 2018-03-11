let axios = require('axios')

let host = '/api/v1/'

function getSum () {
  return axios.get(host + 'kompiles/sum')
}

function getAverage () {
  return axios.get(host + 'kompiles/average')
}

function getUsers (prefix) {
  return axios.get(host + 'users?prefix=' + prefix)
}

function getProjects (prefix) {
  return axios.get(host + 'projects?prefix=' + prefix)
}

function mergeUsersAndProjects (query, callback) {
  return axios.all([getUsers(query), getProjects(query)]).then(axios.spread(callback))
}

function zipSumAverage (callback) {
  axios.all([getSum(), getAverage()]).then(axios.spread(callback))
}

function getSumByProject (project) {
  return axios.get(host + 'kompiles/sum?project=' + project)
}

function getAverageByProject (project) {
  return axios.get(host + 'kompiles/average?project=' + project)
}

function getSumByUser (user) {
  return axios.get(host + 'kompiles/sum?user=' + user)
}

function getAverageByUser (user) {
  return axios.get(host + 'kompiles/average?user=' + user)
}

function getKompilesByProject (project) {
  return axios.get(host + 'kompiles?project=' + project)
}

function getKompilesByUser (user) {
  return axios.get(host + 'kompiles?user=' + user)
}

function zipSumAverageByProject (project, callback) {
  axios.all([getSumByProject(project), getAverageByProject(project)]).then(axios.spread(callback))
}

function zipSumAverageByUser (user, callback) {
  axios.all([getSumByUser(user), getAverageByUser(user)]).then(axios.spread(callback))
}

module.exports = {
  getSum: getSum,
  getAverage: getAverage,
  getUsers: getUsers,
  getProjects: getProjects,
  mergeUsersAndProjects: mergeUsersAndProjects,
  zipSumAverage: zipSumAverage,
  getSumByProject: getSumByProject,
  getAverageByProject: getAverageByProject,
  getSumByUser: getSumByUser,
  getAverageByUser: getAverageByUser,
  zipSumAverageByProject: zipSumAverageByProject,
  zipSumAverageByUser: zipSumAverageByUser,
  getKompilesByProject: getKompilesByProject,
  getKompilesByUser: getKompilesByUser
}
