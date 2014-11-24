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
var goodLobby = {};

io.on('connection', function (socket) {

console.log()
  var user = require('./module/user');
  var chat = require('./module/chat');

  console.log('user connected');

  /**
   * User login
   */
  user.login();

  /**
   * GLOBAL CHAT
   */
  chat.global.message();

  /**
   * LOBBY CHAT
   */
  chat.lobby.message();

  /**
   * DISCONNECT USER
   */
  user.disconnect();
});

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
