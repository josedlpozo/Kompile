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

describe('Average', function() {
	beforeEach(function(done) {
		db.clearDB(done);
	});

  	describe('bad requests', function() {
    	it('no given user or project, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			res.body.should.be.a('object');
          			res.body.should.have.property('message');
          			done();
        		});
    	});

    	it('given an user with no kompiles, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary?user=kompiler')
        		.end(function(err, res) {
          			res.should.have.status(400);
          			done();
        		});
    	});

    	it('given a project with no kompiles, should return a bad request', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary?project=kompiler')
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

    	it('given a project with two kompiles of 200 and 100 of duration, should return an average of 150', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary?project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.average.should.be.eql(150);
          			done();
        		});
    	});

    	it('given a user with two kompiles of 200 and 100 of duration, should return an average of 150', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary?user=kompiler@info.com')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.average.should.be.eql(150);
          			done();
        		});
    	});

    	it('given a user and project with two kompiles of 200 and 100 of duration, should return an average of 150', function(done) {
      		chai.request(server)
        		.get('/api/v1/kompiles/average/summary?user=kompiler@info.com&project=kompiler-api')
        		.end(function(err, res) {
          			res.should.have.status(200);
          			res.body.should.be.a('object');
          			res.body.average.should.be.eql(150);
          			done();
        		});
    	});
    })
});