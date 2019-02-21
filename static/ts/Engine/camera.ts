import { THECANVAS } from "./canvas.js";

var cam = {
    x: 0,
    y: 0,
    width: THECANVAS.width,
    height: THECANVAS.height,
    //area limite em que o objeto foco fica na camera
    innerLeftBoundary: function () {    //limite a esquerda sem interferir na camera
        return this.x + (this.width * 0.25);
    },
    innerTopBoundary: function () {
        return this.y + (this.height * 0.25);
    },
    innerRightBoundary: function () {
        return this.x + (this.width * 0.75);
    },
    innerBottomBoundary: function () {
        return this.y + (this.height * 0.75);
    }
};

function updateCam(player, mapa) {
    //verifica relacao personagem / camera
    if (player.sprites.posX < cam.innerLeftBoundary()) {
        cam.x = player.sprites.posX - (cam.width * 0.25);
    }
    if (player.sprites.posX + 42 > cam.innerRightBoundary()) {
        cam.x = player.sprites.posX + 42 - (cam.width * 0.75);    //saindo pela direita
    }
    if (player.sprites.posY < cam.innerTopBoundary()) {
        cam.y = player.sprites.posY - (cam.height * 0.25);
    }
    if (player.sprites.posY + 63  > cam.innerBottomBoundary()) {
        cam.y = player.sprites.posY + 63  - (cam.height * 0.75);
    }

    cam.x = Math.max(0, Math.min(mapa.largura - cam.width, cam.x));
    cam.y = Math.max(0, Math.min(mapa.altura - cam.height, cam.y));
}

export { cam, updateCam }
