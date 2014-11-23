var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var net = require('net');

var buffer = require('buffer');

http.listen(80);

app.use(express.static(path.join(__dirname, 'public')));

var playerPos = {
    x: 0,
    y: 0
};
var clickPos = {
    x: null,
    y: null
}
var clickRadius = 1;

io.on('connection', function (socket) {
    socket.on('p1 move', function (data) {
        playerPos = {
            x: Math.floor(data.x),
            y: Math.floor(data.y)
        }
    });
    socket.on('p2 click', function (data) {

        clickPos = {
            x: Math.floor(data.x),
            y: Math.floor(data.y)
        }

        console.log(clickPos);

        //Win
        if(playerPos.x == clickPos.x &&
           playerPos.y == clickPos.y) {
            socket.emit('p1 endGame', true);
            socket.emit('p2 endGame', true);
        } else if(playerNearClick()) {
            socket.emit('p1 closeClick', true);
            socket.emit('p2 closeClick', true);
        }
    });
});

function playerNearClick() {
    for(var x = clickPos.x - clickRadius; x <= clickPos.x + clickRadius; x++) {
        for(var y = clickPos.y - clickRadius; y <= clickPos.y + clickRadius; y++) {
            if(playerPos.x == x &&
               playerPos.y == y) {
                return true;
            }
        }
    }
    return false;
}

net.createServer(function(c) {
    c.on('data', function(data) {
        console.log(data.readInt32BE(5));
    });
    c.write('hello\r\n');
    c.pipe(c);
}).listen(5000);
