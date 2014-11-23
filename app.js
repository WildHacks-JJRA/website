var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');

var folder = 'public';

server.listen(80);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/'+ folder +'/index.html');
});

var players = {};
var lobby = {};

io.on('connection', function (socket) {
  console.log('user connected');

  socket.on('set username', function(data) {
    console.log('receive login req');

    socket.username = data;
    // socket.lobby = 'global';
    // if(typeof lobby.global == 'undefined') {
    //   lobby['global'] = {};
    // }

    // lobby['global'].push(data);

    players[data] = socket;

    socket.emit('login', true);
    console.log('added user: '+socket.username);
  });

  socket.on('user global message', function(data) {
    if(data.length > 0) {
      console.log('receive global message');
      socket.emit('display global message', {
        username: socket.username,
        message: data
      });
    }
  });

  socket.on('user local message', function(data) {
    if(data.length > 0) {
      console.log('receive local message');
      lobby[socket.lobby].emit('display local message', {
        username: socket.username,
        message: data
      });
    }
  });

  socket.on('disconnect', function () {
    if (typeof socket.username != undefined) {
      delete players[socket.username];
      console.log('user left: '+ socket.username);
    }
  });
});


