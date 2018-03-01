var express = require('express');
var router = express.Router();

var projectService = require('./ProjectService');

router.get('/', function(req, res, next) {
  projectService.findBy(req.query.prefix)
    .then(projects => res.send(projects))
    .catch(err => res.status(err.status).send(err));
});

module.exports = router;