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
var playerMaze = {
    size: null,
    rmaze: [],
    dmaze: []
}

var bomb = {
    type: null,
    health: 3
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
var change;

net.createServer(function(c) {
    c.on('data', function (data) {
        change = parseData(data);
    });

    checkClient(c);
    c.pipe(c);
}).listen(5000);

function parseData(data) {
    var string = decoder.write(data);
    var stringType = string.split('\n');


    if(stringType[0] == "maze") {

        var mazeSettings = string.match(/.*?:(.*)/g);
        var setting;

        for(var i = 0; i < mazeSettings.length; i++) {
            setting = mazeSettings[i].split(':');
            if(setting[0] == 'size') {
                maze.size = setting[1];
                playerMaze.size = setting[1];
            } else if(setting[0] == 'rmaze') { // left/right
                for(var y = 0; y < maze.size; y++) {
                    maze.rmaze[y] = [];
                    playerMaze.rmaze[y] = [];
                    for(var x = 0; x < maze.size; x++) {
                        playerMaze.rmaze[y][x] = 0;
                        maze.rmaze[y][x] = setting[1].substr(x * maze.size + y, 1);
                    }
                }
            } else if(setting[0] == 'dmaze') { // up/down
                for(var y = 0; y < maze.size; y++) {
                    maze.dmaze[y] = [];
                    playerMaze.dmaze[y] = [];
                    for(var x = 0; x < maze.size; x++) {
                        playerMaze.dmaze[y][x] = 0;
                        maze.dmaze[y][x] = setting[1].substr(x * maze.size + y, 1);
                    }
                }
            }
        }
        return 'maze';
    } else if(stringType[0] == "bomb") {
        bomb.type = stringType[1];
        if(bomb.type == 2) {
            bomb.health = bomb.health-1;
            if(bomb.health == 0) {
                return 'dead';
            }
        }
        return 'bomb';
    }
    return false;
}

function revealMaze() {
    for(var y = clickPos.y==0? 0 : clickPos.y-1; y < (clickPos.y+1 < maze.size? maze.size: clickPos.y+1); y++) {
        for(var x = clickPos.x==0? 0 : clickPos.x-1; x < (clickPos.x+1 < maze.size? maze.size: clickPos.x+1); x++) {
            playerMaze.rmaze[y][x] = maze.rmaze[y][x];
            playerMaze.dmaze[y][x] = maze.dmaze[y][x];
        }
    }
}

function checkClient(c) {
    io.on('connection', function (socket) {

        switch(change) {
            case 'maze':
                socket.emit('maze', playerMaze);
                break;
            case 'bomb':
            /* bomb
                0 - miss
                1 - almost
                2 - hit
             */
                socket.emit('bomb', bomb);
                break;
            case 'dead':
                socket.emit('dead', true);
                break;
        }

        socket.on('click', function (data) {

            clickPos = {
                x: Math.floor(data.x),
                y: Math.floor(data.y)
            }
            c.write(clickPos.x+','+clickPos.y);

            revealMaze();
            socket.emit('maze', playerMaze);
        });
    });
}
