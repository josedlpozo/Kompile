var express = require('express');
var router = express.Router();

var userService = require('./UserService');

router.get('/login', function(req, res, next) {
	if (req.session && req.session.logged) {
		res.redirect('/')
	} else {
		res.render('login', { message: '' });
	}
});

router.post('/login', function(req, res, next) {
	userService.getUser(req.body.email, req.body.password)
	.then(user => {
		if (user) {
			req.session.logged = true
			req.session.email = user.email
			res.redirect('/')
		} else {
			res.render('login', { message: 'No user found or password incorrect' })
		}
	}).catch(err => res.render('login', { message: err.toString() }));
});

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
