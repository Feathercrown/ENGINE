const { GameSpace, GamePiece, GameProperty, GamePropertyModifier } = require('./ENGINE.js');

var test = new GameSpace({
    name:'test',
    id:0
}, mapFrom([
    [
        'board', new GamePiece({
            name:'board'
        }, mapFrom([
            [
                'name', new GameProperty('board')
            ]
        ]))
    ]
]));

console.log(test);

function mapFrom(array){
    var map = new Map();
    array.forEach(pair => map.set(pair[0], pair[1]));
    return map;
}