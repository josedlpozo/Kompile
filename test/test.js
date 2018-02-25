'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

let models = require('../models')

chai.use(chaiHttp);

describe('Kompiles', function() {
	beforeEach(function(done) {
		models.Kompile.destroy({
			where:{},
			truncate: true
		});
		models.User.destroy({
			where:{},
			truncate: true
		});
		done()
	});

  	describe('bad requests', function() {
    	it('no given user or project, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    		});

    	it('given an user with no kompiles, should return an empty array', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles?user=kompiler')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(0);
          			done();
        		});
    		});
    });

    describe('successful requests', function() {
    	beforeEach(function(done) {
    		models.User.create({
    			alias: 'kompiler-developer',
    			email: 'kompiler@info.com'
    		}).then(user => {
    			models.Kompile.create({
    				UserId: user.id,
    				project: 'kompiler-api',
    				duration: 200
    			}).then(kompile => done())
    		});
		});

    	it('given a project with no kompiles, should return an empty array', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles?project=kompiler')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(0);
          			done();
        		});
    		});

    	it('given a project with kompiles, should return a kompiles array', function(done) {
    		chai.request(server)
        		.get('/api/v1/kompiles?project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(1);
          			done();
        		});
    	});

    	it('given a user with kompiles, should return a kompiles array', function(done) {
    		chai.request(server)
        		.get('/api/v1/kompiles?user=kompiler@info.com')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(1);
          			done();
        		});
    	});

    	it('given a user and project with kompiles, should return a kompiles array', function(done) {
    		chai.request(server)
        		.get('/api/v1/kompiles?user=kompiler@info.com&project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(1);
          			done();
        		});
    	});
    })
});