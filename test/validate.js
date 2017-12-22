var request = require("request");
var validate = require("../src/validate.js");
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');
var assert = require('assert');
const sinon = require('sinon');
var sandbox;

process.on('unhandledRejection', function (err) {
    throw err;
});

beforeEach(function () {
    sandbox = sinon.sandbox.create();
});

afterEach(function () {
    sandbox.restore();
});

describe('Validate', () => {
    it('validate user brian', function (done) {
        var stub = sandbox.stub(getUserFromDatabase, 'getUserFromDatabase');
        stub.resolves({
            Item:
                {
                    password: '$2a$10$3wk6zPkL9UrTOZuoEgow7.9Q.lpKSBnPyp01uu.WNSpi9LKb.iFkm',
                    username: 'brian',
                    lastName: 'Sutton',
                    firstName: 'Brian'
                }
        });
        validate.validate(request, 'brian', 'brian', 'h')
            .then(function (data) {
                assert.equal(true, data.isValid);
                assert.equal('brian', data.credentials.username);
                assert.equal('Brian', data.credentials.firstName);
                assert.equal('Sutton', data.credentials.lastName);
                done();
            })
    });
});

describe('Not Validated', () => {
    it('not validated user bran', function (done) {
        var stub = sandbox.stub(getUserFromDatabase, 'getUserFromDatabase');
        stub.resolves({});
        validate.validate(request, 'bran', 'bran', 'h')
            .then(function (data) {
                assert.equal(false, data.isValid);
                assert.equal(null, data.credentials);
                done();
            })
    });

    it('not valid password user brian', function (done) {
        var stub = sandbox.stub(getUserFromDatabase, 'getUserFromDatabase');
        stub.resolves({
            Item:
                {
                    password: '$2a$10$3wk6zPkL9UrTOZuoEgow7.9Q.lpKSBnPyp01uu.WNSpi9LKb.iFkm',
                    username: 'brian',
                    lastName: 'Sutton',
                    firstName: 'Brian'
                }
        });
        validate.validate(request, 'brian', 'invalidPassword', 'h')
            .then(function (data) {
                assert.equal(false, data.isValid);
                assert.equal('brian', data.credentials.username);
                assert.equal('Brian', data.credentials.firstName);
                assert.equal('Sutton', data.credentials.lastName);
                done();
            })
    });
});