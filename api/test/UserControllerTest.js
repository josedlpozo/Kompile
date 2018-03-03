'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('./PopulateDB')
let should = chai.should();

chai.use(chaiHttp);

describe('User', function() {
    beforeEach(function(done) {
        db.clearDB(done);
    });

    describe('bad requests', function() {
        it('no given prefix, should return a bad request', function(done) {
            chai.request(server)
                .get('/api/v1/users')
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

        it('given a prefix with user in db, should return an array of users', function(done) {
            chai.request(server)
                .get('/api/v1/users?prefix=kom')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].email.should.be.eql('kompiler@info.com');
                    done();
                });
        });

        it('given a prefix with no user saved, should return an empty array', function(done) {
            chai.request(server)
                .get('/api/v1/users?prefix=test')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    })
});