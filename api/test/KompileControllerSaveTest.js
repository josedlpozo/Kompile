'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('./PopulateDB')
let should = chai.should();

chai.use(chaiHttp);

describe('Kompile save', function() {
	beforeEach(function(done) {
    db.clearDB(done);
	});

  	describe('bad requests', function() {
    	it('no given user, should return a bad request', function(done) {
    		let kompile = { duration: 200, alias: 'kompiler-developer'}
      		chai.request(server)
        		.post('/api/v1/kompiles')
        		.send(kompile)
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});

    	it('no given duration, should return a bad request', function(done) {
    		let kompile = { user: 'kompiler@info.com', alias: 'kompiler-developer'}
      		chai.request(server)
        		.post('/api/v1/kompiles')
        		.send(kompile)
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});

    	it('given zero duration, should return a bad request', function(done) {
    		let kompile = { user: 'kompiler@info.com', alias: 'kompiler-developer', duration: 0}
      		chai.request(server)
        		.post('/api/v1/kompiles')
        		.send(kompile)
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});

    	it('no given project, should return a bad request', function(done) {
    		let kompile = { user: 'kompiler@info.com', alias: 'kompiler-developer', duration: 20}
      		chai.request(server)
        		.post('/api/v1/kompiles')
        		.send(kompile)
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});
    });

    describe('successful requests', function() {
    	it('given a kompile, should return a kompile saved', function(done) {
      		let kompile = { user: 'kompiler@info.com', alias: 'kompiler-developer', project: 'kompiler-api', duration: 20}
      		chai.request(server)
        		.post('/api/v1/kompiles')
        		.send(kompile)
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.should.have.property('user');
          			res.body.user.should.be.eql('kompiler@info.com');
          			done();
        		});
    	});
    })
});