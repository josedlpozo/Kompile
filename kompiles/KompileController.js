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

router.post('/user/:id/create', function(req, res, next) {
	kompileService.saveKompile(req.params.id, req.body).then(kompile => res.send(kompile))
	.catch(err => res.status(500).send({ error: err.toString() }));
});

module.exports = router;
