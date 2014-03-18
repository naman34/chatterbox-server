//var express = require('express'); //Express FTW :(
var path = require('path');
//var app = express();
var get = require('./routes/chats.js').get;
var post = require('./routes/chats.js').post;
var returnFile = require('./routes/static.js').returnFile;

//CORS headers, defined up top for clarity
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports.handler = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);
  //app(req, res);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  var filePath, contentType;



  if(req.url === '/' || req.url === '/index.html' || req.url.match(/^\/\?/)){
    filePath = "./../client/index.html";
    contentType = "text/html";
    returnFile(req, res, filePath, contentType);
  } else if( req.url.match(/^\/scripts\//) || req.url.match(/^\/bower_components\//) ) {
    contentType = 'application/javascript';
    filePath = "./../client/" + req.url;
    returnFile(req, res, filePath, contentType);
  } else if( req.url.match(/^\/styles\//) ) {
    contentType = 'text/css';
    filePath = "./../client/" + req.url;
    returnFile(req, res, filePath, contentType);
  } else if( req.url.match(/^\/images\//) ) {
    contentType = 'image/gif';
    filePath = "./../client/" + req.url;
    returnFile(req, res, filePath, contentType, true);
  } else if(req.url.match(/^\/classes\/[\w]+/) && req.method === "GET"){
    headers['Content-Type'] = "text/json";
    res.writeHead(200, headers);
    get(req, res);
  } else if(req.url.match(/^\/classes\/[\w]+/) && req.method === "POST"){
    headers['Content-Type'] = "text/json";
    res.writeHead(201, headers);
    post(req, res);
  } else {
    res.writeHead(404, headers);
    res.end("404 - File Not Found!");
  }
};
























//All the code I was writing for express
// //handles the case when there might be files uploaded to the server
// app.use(express.bodyParser({
//     keepExtensions: true,
//     uploadDir: __dirname + '/../client/uploads'
// }));

// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, '../client/')));
// app.all("*", function(req, res, next){
//   res.set(defaultCorsHeaders);
//   next();
// });

//  app.get('/', express.static(path.join(__dirname, '../client/index.html')));
// app.post('/classes/:roomname', function(req, res){
//   console.log(req.body);
//   console.log(req.url);
//   res.send("got something...");
// });


// //if the req falls through all the other handlers, a 404 is sent.
// app.use(function(req, res, next) {
//     res.status(404).send();
// });

