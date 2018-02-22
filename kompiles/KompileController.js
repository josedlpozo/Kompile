var express = require('express');
var router = express.Router();

var kompileService = require('./KompileService');

router.get('/user/:id/', function(req, res, next) {
  kompileService.retrieveKompiles(req.params.id)
    .then(kompiles => {
      if (!kompiles) res.status(404).send({ error: 'Kompiles not found' });
      else res.send(kompiles);
    }).catch(err => res.status(500).send({ error: err.toString() }));
});

router.get('/', function(req, res, next) {
  if (!req.query.user && !req.query.project) res.status(400).send({ error: 'User or Project is required '})
  kompileService.retrieveKompilesByEmailAndProject(req.query.user, req.query.project)
    .then(kompiles => {
      if (!kompiles) res.status(404).json({ error: 'Kompiles not found' });
      else res.send(kompiles);
    }).catch(err => {
      if (err.error == 404) res.status(404).send({ error: req.query.user + ' user not found'})
      else res.status(500).send({ error: err.toString() })
    });
});

router.get('/project', function(req, res, next) {
  if (!req.query.project) res.status(400).send({ error: 'Project is required '})
  kompileService.retrieveKompilesByProject(req.query.project)
    .then(kompiles => {
      if (!kompiles) res.status(404).send({ error: 'Kompiles not found' });
      else res.send(kompiles);
    }).catch(err => {
      if (err.error == 404) res.status(404).send({ error: req.query.project + ' project not found'})
      else res.status(500).send({ error: err.toString() })
    });
});

router.post('/create', function(req, res, next) {
	kompileService.saveKompile(req.body).then(kompile => res.send(kompile))
	.catch(err => res.status(500).send({ error: err.toString() }));
});

module.exports = router;
