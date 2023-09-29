
function prn2() {
    console.log(this._value);
}

const prn3 =  ()=> {
    console.log(this);
}

class MaClasse {
    constructor() {
        this._value = 'toto';
    }

    print() {
        console.log(this._value);
    }

    _value2 = 'titi'

    print2 = function prn2() {
        console.log(this._value);
    }

    print3 = ()=> {
        console.log(this._value);
    }
}

let v = new MaClasse();
// v.print3();

const target1 = v.print.bind(v);
const target2 = v.print2.bind(v);
const target3 = v.print3;

target1();
target2();
target3();

// function toto() {
//     console.log();
// }
//
// const titi = ()=> {
//     console.log();
// }