var example = [
    // [0, 1, 1, 1, 1, 1, 1, 1],
    // [0, 0, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1],
    // [1, 1, 0, 1, 1, 1, 1, 1]
];

var mazeData = { size: '10',
  rmaze:
   [ [ '0', '0', '1', '0', '1', '0', '0', '0', '0', '1' ],
     [ '0', '1', '0', '0', '0', '1', '0', '1', '0', '1' ],
     [ '0', '0', '0', '1', '0', '0', '0', '1', '0', '1' ],
     [ '1', '0', '1', '0', '0', '1', '1', '1', '0', '1' ],
     [ '0', '0', '1', '1', '1', '0', '0', '1', '0', '1' ],
     [ '1', '0', '0', '1', '0', '1', '1', '0', '0', '1' ],
     [ '0', '0', '0', '1', '1', '0', '1', '1', '0', '1' ],
     [ '0', '1', '0', '0', '1', '0', '0', '0', '1', '1' ],
     [ '0', '0', '1', '0', '0', '0', '1', '0', '1', '1' ],
     [ '1', '1', '0', '0', '1', '1', '0', '1', '0', '1' ] ],
  dmaze:
   [ [ '1', '0', '1', '0', '1', '1', '0', '1', '0', '1' ],
     [ '0', '1', '1', '0', '0', '1', '0', '1', '1', '0' ],
     [ '0', '1', '0', '1', '1', '0', '0', '0', '0', '1' ],
     [ '1', '0', '1', '0', '0', '1', '0', '1', '0', '1' ],
     [ '0', '1', '1', '1', '1', '0', '0', '1', '0', '1' ],
     [ '1', '1', '0', '1', '0', '1', '1', '0', '1', '0' ],
     [ '1', '1', '0', '1', '1', '0', '1', '1', '0', '0' ],
     [ '0', '1', '0', '0', '1', '1', '0', '0', '1', '0' ],
     [ '0', '0', '1', '1', '0', '0', '1', '0', '1', '0' ],
     [ '1', '1', '1', '0', '1', '1', '1', '1', '1', '1' ] ] }

// var boxArray = example;
var rmaze = mazeData.rmaze
var dmaze = mazeData.dmaze
var lineSize = mazeData.size

// var boxSize = 50;
// var strokeSize = 2;

var stage = new Kinetic.Stage({
container: 'container',
    width: 500,
    height: 500
});
var shapesLayer = new Kinetic.Layer();
var wallGroup = new Kinetic.Group();
// var boxGroup = new Kinetic.Group({
//     x: 0,
//     y: 0,
// });

console.log(new Kinetic.Line({points: [0, 0, 1, 1]}))


for (var y = 0; y < rmaze.length; y++) {
    for (var x = 0; x < rmaze[0].length; x++) {
        switch(rmaze[y][x]) {
            case(0):
                var wall = new Kinetic.Line({
                    // x: x * lineSize,
                    // y: y * lineSize,
                    points: [x * lineSize, y * lineSize, (x * lineSize) + lineSize, y * lineSize],
                    stroke: 'white'
                });
                console.log(wall);
                break;

            case(1):
                var wall = new Kinetic.Line({
                    // x: x * lineSize,
                    // y: y * lineSize,
                    points: [x * lineSize, y * lineSize, (x * lineSize) + lineSize, y * lineSize],
                    stroke: 'black'
                });
                break;

        }
        console.log(wall)
        console.log(rmaze[y][x])
        wallGroup.add(wall);
        
    }
    
    
}

shapesLayer.add(wallGroup);

stage.add(shapesLayer);


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
