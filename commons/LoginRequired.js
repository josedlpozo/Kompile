'use strict';


exports.loginRequired = function(req, res, next) {
	if (req.session && req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}