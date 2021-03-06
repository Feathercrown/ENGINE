const { GameSpace, GamePiece, GameProperty, GamePropertyModifier, SimpleGameAction, MetaGameAction } = require('./ENGINE.js');

var test = new GameSpace({
    name:'test',
    id:0
}, new Map()
    .set('board', new GamePiece(new Map()
            .set('squares', new GameProperty('rTgTgXbXrXgObOyXgOrX\n'+
                                             'yO------bX----s1--bT\n'+
                                             'yT------rT--------yX\n'+
                                             'rOyXyOrOwSrXgTrOgOyO\n'+
                                             'bX------yT--------rO\n'+
                                             'gT------bO--------gT\n'+
                                             'bT------bTrTgXrXyObT\n'+
                                             'yO------------yT--yT\n'+
                                             'gX--s2--------yX--bT\n'+
                                             'rTyXbOrOyTgOrXbOgXrT'))
            .set('x-pos', new GameProperty(-125))
            .set('y-pos', new GameProperty(-125))
            .set('width',  new GameProperty(250))
            .set('height', new GameProperty(250))
            .set('z-order', new GameProperty(-1))
            .set('physical', new GameProperty(true))
        )
    )
    .set('playerHandler', new GamePiece(new Map()
            .set('name', new GameProperty('playerHandler'))
            .set('playerCount', new GameProperty(2))
            .set('playerSettings', new GameProperty([
                {
                    name:'Feathercrown'
                },
                {
                    name:'KLARI'
                }
            ]))
            .set('setup', new SimpleGameAction())
            .set('setupArgs', new SimpleGameAction())
        )
    )
    .set('setupHandler', new GamePiece(new Map()
            .set('name', new GameProperty('setupHandler'))
        )
    )
    .set('piece', new GamePiece(new Map()
            .set('name', new GameProperty('setupHandler'))
            .set('template', new GameProperty(true))
        )
    )
    
);

console.log(test);
