import { Sprites } from "../Engine/sprites.js";
import { CONTEXT } from "../Engine/canvas.js";

var MESA = new Image();
MESA.src = './resources/mesa.png';
var mesa = Sprites(
    {
        context: CONTEXT,
        image: MESA,
        width: 90,
        height: 91,
        posX: 300,
        posY: 100
    });
var mesa2 = Sprites(
    {
        context: CONTEXT,
        image: MESA,
        width: 90,
        height: 91,
        posX: 300,
        posY: 300
    });


export function loadObjects(objColisao) {
    objColisao.push(mesa, mesa2);
}
