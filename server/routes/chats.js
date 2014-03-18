var _ = require('underscore');

exports = (function(){

  var rooms = {};

  var get = function(query){

  };

  var post = function(roomName, messages){
    if(!Array.isArray(messages)){
      messages = [messages];
    }
    messages = _.map(messages, function(message){
      message.text = message.text || "nothing";
      message.username = message.username || "nothing";
      message.roomname = message.roomname || roomName;
      message.createdAt = JSON.stringify(new Date());
      message.updatedAt = message.createdAt;
    });
    if(rooms[roomName] === undefined){
      rooms[roomName] = [];
    }
    rooms[roomName] = rooms[roomName].concat(messages);
    return true;
  };

  return {
    get: get,
    post: post
  };

})();