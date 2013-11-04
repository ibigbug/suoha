var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.set('view engine', 'jade');
app.set('views', __dirname + '/app');
app.use('/static', express.static(__dirname + '/app/sea-modules'));

var route = require('./route/');
route.initHandler(app);
route.initSocket(io);

server.listen(3000);
