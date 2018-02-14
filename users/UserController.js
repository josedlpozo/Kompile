var express = require('express');
var router = express.Router();

var userService = require('./UserService');
var loginRequired = require('../commons/LoginRequired');

router.get('/login', function(req, res, next) {
	if (req.session && req.session.user) {
		res.redirect('/dashboard')
	} else {
		res.render('login', { message: '' });
	}
});

router.post('/login', function(req, res, next) {
	userService.getUser(req.body.email, req.body.password)
	.then(user => {
		if (user) {
			req.session.user = user;
			res.redirect('/')
		} else {
			res.render('login', { message: 'No user found or password incorrect' })
		}
	}).catch(err => res.render('login', { message: err.toString() }));
});

router.post('/logout', function(req, res, next) {
	req.session.user = null;

	res.redirect('/login');
});

router.get('/', function(req, res, next) {
  res.render('index', { user: req.session.user });
});



module.exports = router;
