var express = require('express');
var router = express.Router();

var userService = require('./UserService');

router.get('/login', function(req, res, next) {
	if (req.session && req.session.logged) {
		res.redirect('/dashboard')
	} else {
		res.render('login', { message: '' });
	}
});

router.post('/login', function(req, res, next) {
	userService.getUser(req.body.email, req.body.password)
	.then(user => {
		if (user) {
			req.session.logged = true;
			req.session.email = user.email;
			res.redirect('/')
		} else {
			res.render('login', { message: 'No user found or password incorrect' })
		}
	}).catch(err => res.render('login', { message: err.toString() }));
});

router.post('/logout', function(req, res, next) {
	req.session.logged = false;
	req.session.email = null;

	res.redirect('/login');
});

router.get('/', function(req, res, next) {
  res.render('index', { logged: req.session.logged });
});

function loginRequired(req, res, next) {
	if (req.session && req.session.logged) {
		next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
