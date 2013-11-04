exports.initHandler = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });
};

exports.initSocket = function (io) {
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('event', function (data) {
      console.log(data);
    });
  });
};
