import { Sprites } from "../Engine/sprites.js";
import { CONTEXT } from "../Engine/canvas.js";
import { incluirTOBI } from "./tobi.js";

var MESA = new Image();
MESA.src = './resources/Objects/mesa.png';
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
    incluirTOBI(objColisao, [mesa, mesa2])
}
