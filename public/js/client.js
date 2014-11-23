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
    console.log("CLICKED THE BOX");
    if(clickEnabled) {
        console.log({
            x: e.offsetX / lineSize,
            y: e.offsetY / lineSize
        });

        socket.emit('click', {
            x: e.offsetX / lineSize,
            y: e.offsetY / lineSize
        });
    }
});
