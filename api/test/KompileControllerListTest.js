'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('./PopulateDB')
let should = chai.should();

chai.use(chaiHttp);


describe('Kompile list', function() {
	beforeEach(function(done) {
		db.clearDB(done);
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
    });

    describe('successful requests', function() {
    	beforeEach(function(done) {
        db.populateDB(done)
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
          			res.body.length.should.be.eql(2);
          			done();
        		});
    	});

    	it('given a user with kompiles, should return a kompiles array', function(done) {
    		chai.request(server)
        		.get('/api/v1/kompiles?user=kompiler@info.com')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(2);
          			done();
        		});
    	});

    	it('given a user and project with kompiles, should return a kompiles array', function(done) {
    		chai.request(server)
        		.get('/api/v1/kompiles?user=kompiler@info.com&project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('array');
          			res.body.length.should.be.eql(2);
          			done();
        		});
    	});
    })
});