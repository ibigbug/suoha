var db = require('./config').db,
    USER_STATUS_TABLE = require('./models/user').USER_STATUS_TABLE;

var EventCenter = require('./config').EventCenter;

module.exports = function(io){
  io.sockets.on('connection', function(socket){
    socket.on('disconnect', function(){
      socket.emit('refresh');
    });
    socket.on('login', function(data, fn){
      db.collection('users').find({name:data.name}).toArray(function(err, user){
        db.collection('users').findAndModify({_id:user[0]._id}, [], {$set: {status: USER_STATUS_TABLE.ONLINE}}, {}, function(err, user){
          fn(user);
          socket.emit('refresh', user);
        });
      });
    });

    socket.on('logout', function(uid){
      console.log(uid);
      db.collection('user').update({id:uid}, {$set: {status: USER_STATUS_TABLE.OFFLINE }}, function(err, user){
        console.log(arguments);
        socket.emit('refresh', user);
      })
    });
  });
};
