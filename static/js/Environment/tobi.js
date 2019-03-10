import { RemoveFromArray } from "../Tools/tools.js";
var itens = [];
function incluirTOBI(arr, o = []) {
    o.forEach((o) => {
        arr.push(o);
    });
}
function excluirItem(o) {
    itens = RemoveFromArray(itens, [o]);
}
export { itens, incluirTOBI, excluirItem };
//# sourceMappingURL=tobi.js.map