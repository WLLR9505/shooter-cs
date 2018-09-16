var objColisao = new Array(0);
;
function Sprites(opt) {
    var sprite = {};
    var contador = 0;
    var nQuadros = opt.nQuadros || 1;
    sprite.quadro = opt.quadroInicial || sprite.quadroInicial || 0;
    sprite.quadroFinal = opt.quadroFinal || -1;
    sprite.context = opt.context;
    sprite.width = opt.width;
    sprite.height = opt.height;
    sprite.posX = opt.posX;
    sprite.posY = opt.posY;
    sprite.image = opt.image;
    sprite.nLinhas = opt.nLinhas || 1;
    sprite.nQuadros = opt.nQuadros || 1;
    sprite.TporQuadro = opt.TporQuadro || 0,
        sprite.loop = opt.loop;
    sprite.render = function (x, y, l) {
        sprite.context.drawImage(sprite.image, sprite.quadro * sprite.width / nQuadros, l * sprite.height / sprite.nLinhas, sprite.width / nQuadros, sprite.height / sprite.nLinhas, x, y, sprite.width / nQuadros, sprite.height / sprite.nLinhas);
    };
    sprite.renderThis = function (quadro, linha, x, y) {
        sprite.context.drawImage(sprite.image, quadro * sprite.width / nQuadros, linha * sprite.height / sprite.nLinhas, sprite.width / nQuadros, sprite.height / sprite.nLinhas, x, y, sprite.width / nQuadros, sprite.height / sprite.nLinhas);
    };
    sprite.update = function () {
        contador += 1;
        if (contador > sprite.TporQuadro) {
            contador = 0;
            if (sprite.quadro < sprite.quadroFinal) {
                sprite.quadro += 1;
            }
            else if (sprite.loop) {
                sprite.quadro = 0;
                sprite.quadroInicial = 0;
                sprite.quadroFinal = 0;
            }
        }
    };
    sprite.halfWidth = function () {
        return (sprite.width / sprite.nQuadros) / 2;
    };
    sprite.halfHeight = function () {
        return (sprite.height / sprite.nLinhas) / 2;
    };
    sprite.centerX = function () {
        return sprite.posX + sprite.halfWidth();
    };
    sprite.centerY = function () {
        return sprite.posY + sprite.halfHeight();
    };
    return sprite;
}
var texturas = Sprites({
    context: CONTEXT,
    height: 32,
    width: 160,
    image: TEXTURAS,
    nQuadros: 5
});
function renderizarMapa(mapa) {
    for (let i = 0; i < mapa.length; i++) {
        for (let i2 = 0; i2 < mapa[i].length; i2++) {
            var tile = mapa[i][i2];
            var x = i2 * 32;
            var y = i * 32;
            texturas.renderThis(tile, 0, x, y);
        }
    }
}
function renderizarObjetos() {
    for (var i = 0; i < objColisao.length; i++) {
        objColisao[i].render(objColisao[i].posX, objColisao[i].posY, 0);
    }
}
function block(obj1, obj2) {
    if (obj1 == undefined || obj2 == undefined) {
        console.log('obj1 ou obj2 indefinidos');
        return false;
    }
    var distX = obj1.centerX() - obj2.centerX();
    var distY = obj1.centerY() - obj2.centerY();
    var sumHalfWidth = obj1.halfWidth() + obj2.halfWidth();
    var sumHalfHeight = obj1.halfHeight() + obj2.halfHeight();
    if (Math.abs(distX) < sumHalfWidth && Math.abs(distY) < sumHalfHeight) {
        console.log('colisao!!');
        var overX = sumHalfWidth - Math.abs(distX);
        var overY = sumHalfHeight - Math.abs(distY);
        if (overX >= overY) {
            if (distY > 0) {
                obj1.posY += overY;
            }
            else {
                obj1.posY -= overY;
            }
        }
        else {
            if (distX > 0) {
                obj1.posX += overX;
            }
            else {
                obj1.posX -= overX;
            }
        }
        return true;
    }
    return false;
}
function checkCollision(player) {
    if (player.sprites.posX < 0) {
        player.sprites.posX = 0;
    }
    else if (player.sprites.posX > THECANVAS.width - 42) {
        player.sprites.posX = THECANVAS.width - 42;
    }
    if (player.sprites.posY < 0) {
        player.sprites.posY = 0;
    }
    else if (player.sprites.posY > THECANVAS.height - 63) {
        player.sprites.posY = THECANVAS.height - 63;
    }
    for (let i = 0; i < objColisao.length; i++) {
        block(player.sprites, objColisao[i]);
    }
}
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=engine.js.map