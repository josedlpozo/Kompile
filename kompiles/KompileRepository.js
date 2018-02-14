'use strict';

var models = require('../models');

function findKompilesByUserId(userId) {
	return models.Kompile.findAll({
    	where: {
      		'UserId' : userId
    	}
  	});
}

function findKompilesByEmail(email) {
  return models.User.findOne({
      where: {
          email : email
      }
    }).then(user => 
      models.Kompile.findAll({
       where: {
        'UserId': user.id
       }
      })
    );
}

function saveKompile(userId, kompile) {
	return models.User.findOne({
    	where: {
      		id : userId
    	}
  	}).then(user => 
  		models.Kompile.create({
			 UserId: user.id,
			 duration: kompile.duration
		  })
  	);
}

module.exports = {
  findKompilesByUserId: findKompilesByUserId,
  findKompilesByEmail: findKompilesByEmail,
  saveKompile: saveKompile
};