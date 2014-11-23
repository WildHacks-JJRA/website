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
var clickPos = {};


var bombSound = document.createElement('audio');
bombSound.setAttribute('src', './mp3/bomb.mp3');
// bombSound.setAttribute('autoplay', 'autoplay');

bombSound.addEventListener("load", function() {
    bombSound.play();
}, true);


$container.on('click', function(e) {
    if(clickEnabled) {
        clickPos = {
            x: Math.floor(e.offsetX / lineSize),
            y: Math.floor(e.offsetY / lineSize)
        };

        $("<div><div></div></div>").addClass("circle").offset({ left: e.pageX-25, top: e.pageY-25 }).appendTo("body").find('div').animate({
            height: 50,
            width: 50,
            marginTop: 0,
            marginLeft: 0
        }, 500, 'swing', function() {
            $(this).parent().fadeOut('slow');
        });

        bombSound.play();

        socket.emit('click', clickPos);
        clickEnabled = false;
        launchRecharge();
    }
});
