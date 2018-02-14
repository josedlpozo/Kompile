var express = require('express');
var router = express.Router();

var userService = require('./UserService');

router.get('/', function(req, res, next) {
  userService.retrieveUsers()
    .then(users => {
      if (!users) res.status(404).send({ error: 'Users not found' });
      else res.send(users);
    }).catch(err => res.status(500).send({ error: err.toString() }));
});

router.post('/create', function(req, res, next) {
	userService.saveUser(req.body).then(user => res.send(user))
	.catch(err => res.status(500).send({ error: err.toString() }));
});

module.exports = router;
