var http = require('http');
var fs = require('fs');
var static_contents = require('./static_contents.js');

var server = http.createServer(function (request, response)
{
    static_contents.respond(request, response);
});

server.listen(7077);
console.log("Running in localhost at port 7077");