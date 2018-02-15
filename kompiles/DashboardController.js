var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');
var loginRequired = require('../commons/LoginRequired');

router.get('/dashboard', loginRequired.loginRequired, function(req, res, next) {
	kompileService.retrieveKompilesByGroup(req.session.user.group).then(kompiles => {
		res.render('dashboard', { user: req.session.user, kompiles: kompiles });
	})
});

router.get('/dashboard/user', loginRequired.loginRequired, function(req, res, next) {
	kompileService.retrieveKompiles(req.session.user.id).then(kompiles => {
		res.render('dashboard_user', { user: req.session.user, kompiles: kompiles });
	})
});

module.exports = router;