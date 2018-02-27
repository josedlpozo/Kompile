'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('./PopulateDB')
let should = chai.should();

chai.use(chaiHttp);

describe('Average sum', function() {
	beforeEach(function(done) {
		db.clearDB(done);
	});

  	describe('bad requests', function() {
    	it('no given user or project, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});

    	it('given an user with no kompiles, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary?user=kompiler')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			done();
        		});
    	});

    	it('given a project with no kompiles, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary?project=kompiler')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			done();
        		});
    	});
    });

    describe('successful requests', function() {
    	beforeEach(function(done) {
    		db.populateDB(done)
		});

    	it('given a project with two kompiles of 200 and 100 of duration, should return a sum of 300', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary?project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.sum.should.be.eql(300);
          			done();
        		});
    	});

    	it('given a user with two kompiles of 200 and 100 of duration, should return a sum of 300', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary?user=kompiler@info.com')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.sum.should.be.eql(300);
          			done();
        		});
    	});

    	it('given a user and project with two kompiles of 200 and 100 of duration, should return a sum of 300', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/sum/summary?user=kompiler@info.com&project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.sum.should.be.eql(300);
          			done();
        		});
    	});
    })
});