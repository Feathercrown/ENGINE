var Symbols = {
    argument: Symbol('argument')
};

exports.GameSpace = class GameSpace {
    constructor(meta, pieces){
        this.meta = meta || {};
        this.pieces = pieces || new Map();
    }
}

exports.GamePiece = class GamePiece {
    constructor(properties, watchers){
        this.properties = properties || new Map();
        this.watchers = watchers || [];
    }

    setProperty(){

    }
}

exports.GameProperty = class GameProperty {
    constructor(value, lockLevel, modifiers){
        this.value = value || null;
        this.lockLevel = lockLevel || 0;
        this.modifiers = modifiers || null;
    }

    get(){
        var mods = this.modifiers.sort((mod1, mod2)=>(mod1.priority - mod2.priority));
        return mods.reduce((acc, cur)=>cur.modify(acc, this), this.value);
    }

    set(keyLevel){
        if((keyLevel||0) < this.lockLevel){
            return false;
        }
        //TODO: ???
        return true;
    }
}

exports.GamePropertyModifier = class GamePropertyModifier {
    constructor(priority, type, value){
        this.priority = priority;
        this.type = type;
        this.value = value;
    }

    modify(input, piece){
        switch(this.type){
            case "+":
            case "add":
            case "plus":
                return input + this.value;
            case "-":
            case "subtract":
            case "minus":
                return input - this.value;
            case "*":
            case "multiply":
            case "times":
                return input * this.value;
            case "/":
            case "divide":
            case "divided by":
                return input / this.value;
            case "%":
            case "modulo":
            case "modulus":
                return input % this.value;
            case "mathFunc":
            case "mathFunction":
                return Math[this.value](input);
            case "custom":
            case "func":
            case "function":
                return this.value(input);
            case "":
            case "nothing":
            case "none":
                return input;
            default: //TODO: Default case error log fallthrough to explicit case "return input;"?
                //TODO: Log failure case
                return input;
        }
    }
}

exports.SimpleGameAction = class GameAction {
    constructor(type, options){
        this.type = type;
        this.options = options;
    }

    run(args){
        this.options = substituteArguments(this.options, args);
        switch(this.type){
            case 'setProperty':
                this.options.object.setProperty(this.options.property, this.options.value, {method:'direct', ...this.options.info});
                break;
            case 'addToProperty': //TODO: Adding AND pushing to arrays is... questionable but works. Javascript style ftw!
                var property = this.options.property;
                var value = this.options.value;
                var object = this.options.object;
                var info = this.options.info; //TODO: Not done at all
                this.options.object.setProperty(this.options.property, this.options.value, {method:'indirect', ...this.options.info}); //TODO: Actually add
                break;
            case 'takeFromProperty': //TODO: Keep?
                var property = this.options.property;
                var value = this.options.value;
                var object = this.options.object;
                var info = this.options.info;
                this.options.object.setProperty(this.options.property, this.options.value, {method:'indirect', ...this.options.info}); //TODO: Actually add
                break;
            //TODO: Push, pop, shift, unshift, etc. (basically array operations and map support)
            //TODO: Delete, create, and clone gameObjects
            //TODO: ??? idk lol
            default:
                console.error("Invalid simple game function!");
                break;
        }
    }
}

exports.MetaGameAction = class MetaGameAction {
    constructor(type, options){
        this.type = type;
        this.options = options;
    }

    run(args){
        this.options = substituteArguments(this.options, args);
        switch(this.type){
            case 'if':
                if({
                    eq: (this.options.left == this.options.right),
                    lt: (this.options.left <  this.options.right),
                    gt: (this.options.left >  this.options.right),
                    le: (this.options.left <= this.options.right),
                    ge: (this.options.left >= this.options.right),
                    ne: (this.options.left != this.options.right)
                }[this.options.type]||false){
                    this.options.trueFunc.run(args);
                } else {
                    this.options.falseFunc.run(args);
                }
                break;
            case 'loop':
                for(var i=0; i<this.options.count; i++){
                    this.options.func.run(args);
                }
                break;
            case 'random':
                this.options.funcs[Math.floor(Math.random()*this.options.funcs.length)].run(args);
                break;
            default:
                console.error("Invalid meta game function!");
                break;
        }
    }
}

function substituteArguments(options, args){
    options.entries.forEach((entry)=>{
        var key = entry[0];
        var value = entry[1];
        if(Array.isArray(value) && value[0] == Symbols.argument){
            if(args && args.hasOwnProperty(value[1])){
                options[key] = args[value[1]];
            } else {
                console.error("Argument not found; cannot substitute!");
            }
        }
    });
    return options;
}

class FunctionNode {
    constructor(){
        
    }
}