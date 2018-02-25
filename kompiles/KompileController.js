var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');

router.get('/', function(req, res, next) {
  console.log('Call')
  kompileService.retrieveKompilesByEmailAndProject(req.query.user, req.query.project)
    .then(kompiles => res.send(kompiles))
    .catch(err => res.status(err.status).send(err));
});

router.get('/average', function(req, res, next) {
  kompileService.calculateKompileTimeAverageByEmailAndProject(req.query.user, req.query.project)
    .then(average => res.send(average))
    .catch(err => res.status(err.status).send(err));
});

router.post('/', function(req, res, next) {
	kompileService.saveKompile(req.body).then(kompile => res.send(kompile))
	.catch(err => res.status(err.status).send(err));
});

module.exports = router;
