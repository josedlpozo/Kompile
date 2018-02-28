var express = require('express');
var router = express.Router();

var userService = require('./UserService');

router.get('/', function(req, res, next) {
  userService.findBy(req.query.prefix)
    .then(users => res.send(users))
    .catch(err => res.status(err.status).send(err));
});

module.exports = router;