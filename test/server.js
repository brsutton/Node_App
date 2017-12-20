
var request = require("request");
var assert = require('assert');

it("returns status code 200", function(){
    request.get("http://localhost:8080/", function(err, response, body){
        assert.equal(200, response.statusCode);
        done();
    });
});
