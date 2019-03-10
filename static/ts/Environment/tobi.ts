import { RemoveFromArray } from "../Tools/tools.js";
//T.O.B.I
//TIROS / OBJETOS / BOTS / ITENS

// var tirosNoAr = [];
// var objColisao = [];
// var bots = [];
var itens = [];

function incluirTOBI(arr, o = []) {
    o.forEach((o) => {
        arr.push(o);
    })
}
function excluirItem(o) {
    itens = RemoveFromArray(itens, [o])
}

export {
    itens,
    incluirTOBI,
    excluirItem
}
