var request = require("request");
var validate = require("../src/validate.js");
var assert = require('assert');

describe('Validate', async ()=> {
    it('validate user brian', function () {
        validate.validate(request, 'brian', 'brian', 'h')
        .then(function(data){
            assert.equal(true, data.isValid );
            assert.equal('brian', data.credentials.username );
            assert.equal('Brian', data.credentials.firstName );
            assert.equal('Sutton', data.credentials.lastName );
        })
        .catch(function(err){
            console.log(err)
        })
        
    });
});