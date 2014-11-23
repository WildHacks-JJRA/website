var $container = $("#container");

var example = [
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1]
];

var boxArray = example;

var boxSize = 50;
var strokeSize = 2;

var stage = new Kinetic.Stage({
container: 'container',
    width: 800,
    height: 800
});
var shapesLayer = new Kinetic.Layer();

var boxGroup = new Kinetic.Group({
    x: 0,
    y: 0,
});

for(var y = 0; y < boxArray.length; y++) {
    for(var x = 0; x < boxArray[0].length; x++) {

        switch(boxArray[y][x]) {
            case(0): // space
                var box = new Kinetic.Rect({
                    x: x * boxSize,
                    y: y * boxSize,
                    width: boxSize,
                    height: boxSize,
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: strokeSize
                });
                break;
            case(1): // wall
                var box = new Kinetic.Rect({
                    x: x * boxSize,
                    y: y * boxSize,
                    width: boxSize,
                    height: boxSize,
                    fill: 'black'
                });
                break;
        }

        box.on('mouseup', function() {
            this.setFill('gray');
            shapesLayer.draw();
        });
        box

        boxGroup.add(box);
    }
}

shapesLayer.add(boxGroup);

stage.add(shapesLayer);
