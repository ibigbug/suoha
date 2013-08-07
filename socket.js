module.exports = function(io){
  io.sockets.on('connection', function(socket){
    socket.emit('news', { hello: 'world' });
    socket.on('test', function(data){
      console.log(data);
    });
  });
}
