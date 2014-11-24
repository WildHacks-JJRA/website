//User module

module.exports.user = {
  login: function() {
    socket.on('login', function(data) {
      var username = escape(data)
      console.log('receive login req: '+username);

      if(players.indexOf(username)) {
        socket.emit('login', false);
        return;
      }

      socket.username = username;
      socket.join('global');
      socket.room = 'global';

      players[data] = socket;

      socket.emit('login', true);
      io.sockets.emit('display global notice', socket.username+' has joined');
      console.log('added user: '+socket.username);
    });
  },
  disconnect: function() {
    socket.on('disconnect', function () {
      if (typeof socket.username != undefined) {
        this.roomChange();
        socket.leave(socket.room);
        io.sockets.emit('display global notice', socket.username+' has left');
        delete players[socket.username];
        console.log('user left: '+ socket.username);
      }
    });
  },
  roomChange: function(room) {
    if(socket.room == room) {
      return;
    }

    if(typeof socket.room != 'undefined') {
      io.to(socket.room).emit('display lobby notice', socket.username+' has left the lobby');
      socket.leave(socket.room);
    }

    if(typeof room != 'undefined') {
      socket.room = room;
      socket.join(room);

      io.to(room).emit('display lobby notice', socket.username+' has joined the lobby');
    }
  }
};
