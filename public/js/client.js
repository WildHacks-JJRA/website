$.ajax({
    url: '/api/all',
    method: 'get',
    dataType: 'json'
}).done(function(data) {
    console.log(data);
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

        $.ajax({
            url: '/api/click',
            method: 'post',
            data: clickPos
        }).done(function(data) {
            drawMaze(data);
        });

        clickEnabled = false;
        launchRecharge();
    }
});
