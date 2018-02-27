var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');

router.get('/', function(req, res, next) {
  kompileService.retrieveKompilesByEmailAndProject(req.query.user, req.query.project)
    .then(kompiles => res.send(kompiles))
    .catch(err => res.status(err.status).send(err));
});

router.get('/average', function(req, res, next) {
	kompileService.averageByEmailOrProject(req.query.user, req.query.project)
	.then(kompiles => res.send(kompiles))
	.catch(err => res.status(err.status).send(err));
});

router.get('/average/summary', function(req, res, next) {
  kompileService.averageSummaryByEmailAndProject(req.query.user, req.query.project)
    .then(average => res.send(average))
    .catch(err => res.status(err.status).send(err));
});

router.get('/sum', function(req, res, next) {
	kompileService.sumByEmailOrProject(req.query.user, req.query.project)
	.then(kompiles => res.send(kompiles))
	.catch(err => res.status(err.status).send(err));
});

router.get('/sum/summary', function(req, res, next) {
	kompileService.sumSummaryByEmailAndProject(req.query.user, req.query.project)
	.then(kompiles => res.send(kompiles))
	.catch(err => res.status(err.status).send(err));
});

router.post('/', function(req, res, next) {
	kompileService.saveKompile(req.body).then(kompile => res.send(kompile))
	.catch(err => res.status(err.status).send(err));
});

module.exports = router;
