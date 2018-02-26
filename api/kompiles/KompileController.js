var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');

var kompileRepository = require('./KompileRepository');

router.get('/', function(req, res, next) {
  kompileService.retrieveKompilesByEmailAndProject(req.query.user, req.query.project)
    .then(kompiles => res.send(kompiles))
    .catch(err => res.status(err.status).send(err));
});

router.get('/average/summary', function(req, res, next) {
  kompileService.calculateKompileTimeAverageSummaryByEmailAndProject(req.query.user, req.query.project)
    .then(average => res.send(average))
    .catch(err => res.status(err.status).send(err));
});

router.get('/average', function(req, res, next) {
	console.log(req.query.user)
	kompileRepository.averageByProject(req.query.project).then(kompiles => {
		console.log(kompiles)
		res.send('Hola')
	})
});

router.post('/', function(req, res, next) {
	kompileService.saveKompile(req.body).then(kompile => res.send(kompile))
	.catch(err => res.status(err.status).send(err));
});

module.exports = router;
