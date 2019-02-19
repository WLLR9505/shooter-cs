import { postura, estado } from "../Environment/Characters/character.js";
import { Player } from "../Environment/Characters/player.js";

var mouseX, mouseY, mouseCode, v = 3;
var keyPressList = [];

window.onmousedown = function (e) {
    if (typeof e == 'object') {
        mouseCode = e.button;
    }
};

window.onmouseup = function (e) {
    if (typeof e == 'object') {
        mouseCode = undefined;
    }
};

document.onkeydown = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = false;
};

function checkKeys (player : Player) {
    if (keyPressList[16]) { //Shift L
        v = player.velocidade;
    } else {
        v = 3;
    }

    if (keyPressList[82]) { //R
        player.recarregarArma();
    }

    if (keyPressList[65]) { //A
        player.andar('e', [mouseX, mouseY], v);
    } else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (keyPressList[68]) { //D
        player.andar('d', [mouseX, mouseY], v);
    } else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (keyPressList[83]) { //S
        player.andar('b', [mouseX, mouseY], v);
    } else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (keyPressList[87]) { //W
        player.andar('c', [mouseX, mouseY], v);
    } else {
        player.postura = postura(player, estado.PARADO_D);
    }

    switch (mouseCode) {
        case 0:
            player.agir(1, mouseX, mouseY);
            break;
        case 1:
            console.log('Middle click');
            break;
        case 2:
            console.log('R click');
            player.agir(2, mouseX, mouseY);
            break;
    }
}

function onMouseMove (e, cam) {
    mouseX = e.clientX + Math.ceil(cam.x);
    mouseY = e.clientY + Math.ceil(cam.y);
}


export { mouseX, mouseY, mouseCode, keyPressList, onMouseMove, checkKeys }
