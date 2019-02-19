interface I_sprites {
    quadro : number;
    quadroInicial : number;
    quadroFinal : number;
    context : number;
    width : number;
    height : number;
    posX : number;
    posY : number;
    image : number;
    nLinhas : number;
    nQuadros : number;
    TporQuadro : number;
    loop : number;
    render : Function;
    renderThis : Function;
    update : Function;
    halfWidth : Function;
    halfHeight : Function;
    centerX : Function;
    centerY : Function;
};

function Sprites (opt) {
    var sprite : I_sprites = {};
    var contador = 0;   //quantos quadros se passaram
    var nQuadros = opt.nQuadros || 1;

    sprite.quadro = opt.quadroInicial || sprite.quadroInicial || 0;
    sprite.quadroFinal = opt.quadroFinal || -1; //-1 caso não tenha
    sprite.context = opt.context; //onde será renderizada
    sprite.width = opt.width; //largura imagem
    sprite.height = opt.height; //altura da imagem
    sprite.posX = opt.posX;
    sprite.posY = opt.posY;
    sprite.image = opt.image;
    sprite.nLinhas = opt.nLinhas || 1;   //numero real de linhas
    sprite.nQuadros = opt.nQuadros || 1; //numero real de quadros em cada linha
    sprite.TporQuadro = opt.TporQuadro || 0, //tempo até o proximo quadro - min 4 max 10
    sprite.loop = opt.loop; //se true então voltará ao quadro de início
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
            } else if (sprite.loop) {
                sprite.quadro = 0;
                sprite.quadroInicial = 0;
                sprite.quadroFinal = 0;
            }
        }
    };

    sprite.halfWidth = function () {
        //retorna o centro da largura
        return (sprite.width / sprite.nQuadros) / 2;
    };

    sprite.halfHeight  = function () {
        // retorna o centro da altura
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

export { Sprites, I_sprites };
