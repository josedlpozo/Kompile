'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('./PopulateDB')
let should = chai.should();

chai.use(chaiHttp);

describe('Project', function() {
    beforeEach(function(done) {
        db.clearDB(done);
    });

    describe('bad requests', function() {
        it('no given prefix, should return a bad request', function(done) {
            chai.request(server)
                .get('/api/v1/projects')
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

        it('given a prefix with project in db, should return an array of projects', function(done) {
            chai.request(server)
                .get('/api/v1/projects?prefix=kom')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].name.should.be.eql('kompiler-api');
                    done();
                });
        });

        it('given a prefix with no project saved, should return an empty array', function(done) {
            chai.request(server)
                .get('/api/v1/projects?prefix=test')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    })
});