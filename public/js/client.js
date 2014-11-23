var socket = io.connect('http://jjra.cloudapp.net');

socket.on('p2 endGame', function (data) {
    console.log('You win!');
    // when the click was close to the player
});

socket.on('p2 closeClick', function (data) {
    console.log('ping!');
    // when the click was close to the player
});

// Detect mouse pos and send x,y points
var $container = $("#container");
$container.on('click', function(e) {
    if(clickEnabled) {
        console.log({
            x: e.offsetX / boxSize,
            y: e.offsetY / boxSize
        });

        socket.emit('click', {
            x: e.offsetX / boxSize,
            y: e.offsetY / boxSize
        });
    }
});
