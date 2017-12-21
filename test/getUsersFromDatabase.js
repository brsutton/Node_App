var request = require("request");
var assert = require('assert');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');

describe('Get Users From Database', async ()=> {
    it('get user brian', function () {
        const user = getUserFromDatabase.getUserFromDatabase('brian')
        .then(function(data){
           // console.log(data);
            assert.equal('brian', data.Item.username );
            assert.equal('Brian', data.Item.firstName);
            assert.equal('Sutton', data.Item.lastName);
        })
        .catch(function(err){
            console.log(err);
        })
        
    });
});
