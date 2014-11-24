//Chat module

module.exports.chat = {
  global: {
    message: function() {
      socket.on('user global message', function(data) {
        if(data.length > 0) {
          console.log('receive global message');
          io.sockets.emit('display global message', {
            username: socket.username,
            message: escape(data)
          });
        }
      });
    }
  },
  lobby: {
    message: function() {
      socket.on('user lobby message', function(data) {
        if(data.length > 0) {
          console.log('receive lobby message');
          io.to(socket.room).emit('display lobby message', {
            username: socket.username,
            message: escape(data)
          });
        }
      });
    }
  }
};
