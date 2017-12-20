var request = require("request");
var assert = require('assert');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');

describe('Get Users From Database', async ()=> {
    it('get user brian', function () {
        const user = getUserFromDatabase.getUserFromDatabase('brian')
        .then(function(data){
           // console.log(data);
            assert.equal('brian', data.username );
            assert.equal('Brian', data.firstName);
            assert.equal('Sutton', data.lastName);
        })
        .catch(function(err){
            console.log(err);
        })
        
    });
});
