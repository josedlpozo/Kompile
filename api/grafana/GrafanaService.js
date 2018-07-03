'use strict';

var _ = require('underscore')
const axios = require('axios');
const dashboard = require('./dashboard.json');
const grafana = 'http://grafana:3000/'

axios.defaults.headers.common['Authorization'] = `Basic YWRtaW46YWRtaW4=`;

function createDashboardFor(project) {
	var body = JSON.stringify(dashboard)
	body = body.replace(/PROJECT_NAME/gi, project.name)
	body = body.replace(/PROJECT_ID/gi, project.id)
	axios.post(grafana + 'api/dashboards/db', JSON.parse(body)).then(response => console.log(response)).catch(err => console.log(err))
}

function createUser(email, alias) {
	axios.post(grafana + 'api/admin/users', {
    	name: alias,
    	email: email,
    	login: alias,
    	password: 'default'
  	}).then(response => {
  		axios.put(grafana + 'api/admin/users/' + response.data.id + '/permissions', {
  			isGrafanaAdmin: true
  		}).then(response => console.log(response)).catch(err => console.log(err));
  	}).catch(err => console.log(err))
}

module.exports = {
  	createDashboardFor: createDashboardFor,
  	createUser: createUser
}