function Sprites (opt) {
    var sprite = {},
        contador = 0;   //quantos quadros se passaram
    var nQuadros = opt.nQuadros || 1;

    sprite.quadro = opt.quadroInicial || sprite.quadroInicial || 0;
    sprite.quadroFinal = opt.quadroFinal || -1; //-1 caso não tenha
    sprite.context = opt.context; //onde será renderizada
    sprite.width = opt.width; //largura imagem
    sprite.height = opt.height; //altura da imagem
    sprite.image = opt.image;
    sprite.TporQuadro = opt.TporQuadro || 0, //tempo até o proximo quadro - min 4 max 10
    sprite.loop = opt.loop; //se true então voltará ao quadro de início
    sprite.render = function (x, y) {
        sprite.context.drawImage(sprite.image, sprite.quadro * sprite.width / nQuadros, 0, sprite.width / nQuadros, sprite.height, x, y, sprite.width / nQuadros, sprite.height);
    };

    sprite.update = function (qInicial, qFinal) {
        contador += 1;
        if (contador > sprite.TporQuadro) {
            contador = 0;
            if (sprite.quadro < qFinal - 1) {
                sprite.quadro += 1;
            } else if (sprite.loop) {
                sprite.quadro = qInicial - 1;
            }
        }
    };
    return sprite;
}
