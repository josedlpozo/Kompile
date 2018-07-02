'use strict';

var _ = require('underscore')
const axios = require('axios');
const grafana = 'http://grafana:3000/'

axios.defaults.headers.common['Authorization'] = `Basic YWRtaW46YWRtaW4=`;

function createDashboardFor(project) {
	console.log("createDashboardFor " + project)
	axios.get(grafana + 'api/search/').then(response => console.log(response)).catch(err => console.log(err))
}

function createUser(email, alias) {
	axios.post(grafana + 'api/admin/users', {
    	name: alias,
    	email: email,
    	login: alias,
    	password: 'test'
  	}).then(response => console.log(response)).catch(err => console.log(err))
}

module.exports = {
  	createDashboardFor: createDashboardFor,
  	createUser: createUser
}