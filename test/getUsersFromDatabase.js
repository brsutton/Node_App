
const assert = require('assert');
const sinon = require('sinon');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');
var sandbox;

beforeEach(function () {
    sandbox = sinon.sandbox.create();
});

afterEach(function () {
    sandbox.restore();
});

describe('Get Users From Database Success', () => {
    it('get user brian', function (done) {
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

        const data = getUserFromDatabase.getUserFromDatabase('brian');

        data.then(function (data) {
            assert.equal('brian', data.Item.username);
            assert.equal('Brian', data.Item.firstName);
            assert.equal('Sutton', data.Item.lastName);
            done();
        })
    });
});

describe('Get Users From Database Error', () => {
    it('error from database', function (done) {

        var stub = sandbox.stub(getUserFromDatabase, 'getUserFromDatabase');
        stub.rejects('TypeError');
        const data = getUserFromDatabase.getUserFromDatabase('notUser');

        data.then(function () {

        })
            .catch(function (err) {
                assert.equal('TypeError', err);
                done();
            });
    });
});
