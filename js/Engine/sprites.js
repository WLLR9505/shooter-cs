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
export { Sprites };
//# sourceMappingURL=sprites.js.map