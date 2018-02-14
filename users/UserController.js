var express = require('express');
var router = express.Router();

var userService = require('./UserService');

router.get('/login', function(req, res, next) {
  res.render('login', { message: '' });
});

router.post('/login', function(req, res, next) {
	console.log(req.body.email)
	console.log(req.body.password)
	userService.getUser(req.body.email, req.body.password)
	.then(user => { 
		if (user) {
			res.redirect('/')
		} else {
			res.render('login', { message: 'No user found or password incorrect' })
		}
	}).catch(err => res.render('login', { message: 'No user found or password incorrect' }));
});

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
