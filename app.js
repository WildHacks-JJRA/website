var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var net = require('net');

var maze = {
    size: null,
    rmaze: [],
    dmaze: []
};

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

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

net.createServer(function(c) {

    c.on('data', function(data) {
        var string = decoder.write(data);
        var stringType = string.split('\n');

        if(stringType[0] == "maze") {

            var mazeSettings = string.match(/.*?:(.*)/g);
            var setting;

            for(var i = 0; i < mazeSettings.length; i++) {
                setting = mazeSettings[i].split(':');
                if(setting[0] == 'size') {
                    maze.size = setting[1];
                } else if(setting[0] == 'rmaze') { // left/right
                    for(var y = 0; y < maze.size; y++) {
                        maze.rmaze[y] = [];
                        for(var x = 0; x < maze.size; x++) {
                            maze.rmaze[y][x] = setting[1].substr(x * maze.size + y, 1);
                        }
                    }
                } else if(setting[0] == 'dmaze') { // up/down
                    for(var y = 0; y < maze.size; y++) {
                        maze.dmaze[y] = [];
                        for(var x = 0; x < maze.size; x++) {
                            maze.dmaze[y][x] = setting[1].substr(x * maze.size + y, 1);
                        }
                    }
                }
            }
            socket.emit('maze', maze);
        } else {

        }
    });
    io.on('connection', function (socket) {
        socket.on('click', function (data) {

            clickPos = {
                x: Math.floor(data.x),
                y: Math.floor(data.y)
            }
            c.write(clickPos.x+','+clickPos.y);
        });
    });
    c.pipe(c);
}).listen(5000);
