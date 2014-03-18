var http = require("http");
var handleRequest = require('./request-handler.js').handler;

var port = 3000;
var ip = "127.0.0.1";

exports.server = http.createServer(handleRequest).listen(port, ip);

console.log("Listening on http://" + ip + ":" + port);
