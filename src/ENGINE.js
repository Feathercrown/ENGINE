exports.GameSpace = class GameSpace {
    constructor(meta, pieces){
        this.meta = meta || {};
        this.pieces = pieces || new Map();
    }
}

exports.GamePiece = class GamePiece {
    constructor(meta, properties, watchers){
        this.meta = meta || {};
        this.properties = properties || new Map();
        this.watchers = watchers || [];
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

exports.GameAction = class GameAction {
    constructor(type, args){
        this.type = type;
        this.args = args;
    }
}