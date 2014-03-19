var mongojs = require('mongojs');

var db = mongojs('chatterbox:chatterboxer@oceanic.mongohq.com:10046/storminNorman', ['chats']);

exports.get = function(req, res){

  var roomname = req.params.roomname;
  var order = req.query.order;
  var filter = req.query.where; //JSON string.
  var sorter = {};
  if(!!filter){
    filter = JSON.parse(filter);
    for(var key in filter){
      if(typeof filter[key] === 'object' && ( filter[key].hasOwnProperty("$gt") || filter[key].hasOwnProperty("$lt") ) ){
        if(filter[key].$gt.__type === 'Date' || filter[key].$lt.__type === 'Date'){
          filter[key].$gt = new Date(filter[key].$gt.iso);
        }
      }
    }
  } else {
    filter = {};
  }
  if(!!order){
    if(order[0] = "-"){
      sorter[order.slice(1)] = -1;
    } else {
      sorter[order] = 1;
    }
  }
  db.chats.find(filter).sort(sorter, function(err, messages){
    if(!!err){
      console.log(err);
      return res.send(500, "An error occured. Sorry!");
    }
    res.send({
      results: messages,
      success: true
    });
  });
};


exports.post = function(req, res){

  console.log(req.body);
  var message = req.body;
  message.text = message.text || "nothing";
  message.username = message.username || "nothing";
  message.roomname = message.roomname || 'lobby';
  message.createdAt = new Date();
  message.updatedAt = message.createdAt;
  message.objectId = ((new Date()).valueOf());

  db.chats.save(message, function(err, data){
    if(!!err){
      return res.send(500, "An error occured. Sorry!");
    }
    res.send(JSON.stringify({
      success: true,
      updatedAt: new Date(),
      createdAt: new Date(),
      results: message
    }));

  });
};