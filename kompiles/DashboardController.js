var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');
var loginRequired = require('../commons/LoginRequired');

router.get('/dashboard', loginRequired.loginRequired, function(req, res, next) {
	kompileService.retrieveKompilesByEmail(req.session.user.email).then(kompiles => {
		res.render('dashboard', { user: req.session.user, kompiles: kompiles });
	})
});

module.exports = router;