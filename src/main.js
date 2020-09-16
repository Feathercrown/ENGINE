const { GameSpace, GamePiece, GameProperty, GamePropertyModifier } = require('./ENGINE.js');

var test = new GameSpace({
    name:'test',
    id:0
}, new Map()
    .set('board', new GamePiece({
            name:'board'
        }, new Map()
            .set('name', new GameProperty('board'))
        )
    )
    .set('player', new GamePiece({}, new Map()
            .set('name', new GameProperty('player'))
        )
    )
);

console.log(test);
