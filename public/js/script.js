var example = [
    // [0, 1, 1, 1, 1, 1, 1, 1],
    // [0, 0, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1]
];

socket.on('maze', function (data) {
    drawMaze(data);
    // when the click was close to the player
});

function drawMaze(mazeData) {

    // var boxArray = example;
    var rmaze = mazeData.rmaze
    var dmaze = mazeData.dmaze
    // var lineSize = parseInt(mazeData.size,10)


    // var boxSize = 50;
    // var strokeSize = 2;

    var stage = new Kinetic.Stage({
        container: 'container',
        width: 500,
        height: 500
    });

    lineSize = Math.floor(stage.getWidth()/parseInt(mazeData.size, "10"))
    var wallLayer = new Kinetic.Layer();
    var openLayer = new Kinetic.Layer();
    var borderLayer = new Kinetic.Layer();

    var blackWall = new Kinetic.Group();
    var whiteWall = new Kinetic.Group();
    var borderWall = new Kinetic.Group();
    // var boxGroup = new Kinetic.Group({
    //     x: 0,
    //     y: 0,
    // });

    for (var y = 0; y < dmaze.length; y++) {
        for (var x = 0; x < dmaze[0].length; x++) {
            switch(dmaze[y][x]) {
                case('0'):
                    var wall = new Kinetic.Line({
                        // x: x * lineSize,
                        // y: y * lineSize,
                        points: [x * lineSize, (y * lineSize) + lineSize, (x * lineSize) + lineSize, (y * lineSize) + lineSize],
                        stroke: '#f5f5f5'
                    });
                    whiteWall.add(wall);
                    break;

                case('1'):
                    var wall = new Kinetic.Line({
                        // x: x * lineSize,
                        // y: y * lineSize,
                        points: [x * lineSize, (y * lineSize) + lineSize, (x * lineSize) + lineSize, (y * lineSize) + lineSize],
                        stroke: 'black'
                    });
                    blackWall.add(wall);
                    break;

            }

        }


    }

    for (var y = 0; y < rmaze.length; y++) {
        for (var x = 0; x < rmaze[0].length; x++) {
            switch(rmaze[y][x]) {
                case('0'):
                    var wall = new Kinetic.Line({
                        // x: x * lineSize,
                        // y: y * lineSize,
                        points: [(x * lineSize) + lineSize, y * lineSize, (x * lineSize) + lineSize, (y * lineSize) + lineSize],
                        stroke: '#f5f5f5'
                    });
                    whiteWall.add(wall);
                    break;

                case('1'):
                    var wall = new Kinetic.Line({
                        // x: x * lineSize,
                        // y: y * lineSize,
                        points: [(x * lineSize) + lineSize, y * lineSize, (x * lineSize) + lineSize, (y * lineSize) + lineSize],
                        stroke: 'black'
                    });
                    blackWall.add(wall);
                    break;

            }

        }

    }

    blackWall.add(new Kinetic.Line({
        points: [lineSize, 0, stage.getWidth(), 0, stage.getWidth(), stage.getWidth()],
        stroke: 'black'
    }))

    blackWall.add(new Kinetic.Line({
        points: [0, stage.getWidth(), 0, 0 ],
        stroke: 'black'
    }))

    borderLayer.add(borderWall.add(new Kinetic.Line({
        points: [stage.getWidth(), stage.getWidth(), 0, stage.getWidth(), 0, 0],
        stroke: 'black'
    })));

    wallLayer.add(blackWall);
    openLayer.add(whiteWall);

    stage.add(wallLayer);
    stage.add(openLayer);
    stage.add(borderLayer);

    wallLayer.setZIndex(2);
    openLayer.setZIndex(1);
    borderLayer.setZIndex(0);
}


// for(var y = 0; y < boxArray.length; y++) {
//     for(var x = 0; x < boxArray[0].length; x++) {

//         switch(boxArray[y][x]) {
//             case(0): // space
//                 var box = new Kinetic.Rect({
//                     x: x * boxSize,
//                     y: y * boxSize,
//                     width: boxSize,
//                     height: boxSize,
//                     fill: 'white',
//                     stroke: 'black',
//                     strokeWidth: strokeSize
//                 });
//                 break;
//             case(1): // wall
//                 var box = new Kinetic.Rect({
//                     x: x * boxSize,
//                     y: y * boxSize,
//                     width: boxSize,
//                     height: boxSize,
//                     fill: 'black'
//                 });
//                 break;
//         }

//         boxGroup.add(box);
//     }
// }

// shapesLayer.add(boxGroup);

// stage.add(shapesLayer);
