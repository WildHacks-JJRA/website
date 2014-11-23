var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

http.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));

var playerOnePos = {
    x: 0,
    y: 0
};
var clickRadius = 1;

io.on('connection', function (socket) {
    socket.on('p1 move', function (data) {
        playerPos.x = Math.ceil(data.x);
        playerPos.y = Math.ceil(data.y);
    });
    socket.on('p2 click', function (data) {

        //Win
        if(playerPos.x == Math.ceil(data.x) &&
           playerPos.y == Math.ceil(data.y)) {
            // socket.emit('')
        }

        //Close
        if(playerNearClick(data)) {
            socket.emit('p1 closeClick', true);
            socket.emite('p2 closeClick', true);
        }
    });
});

function playerNearClick(clickPos) {
    for(var x = clickPos.x - clickRadius; x <= clickPos.x + clickRadius; x++) {
        for(var y = clickPos.y - clickRadius; y <= clickPos.y + clickRadius; y++) {
            if(playerPos.x == x && playerPos.y) {
                return true;
            }
        }
    }
    return false;
}
