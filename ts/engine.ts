var objColisao = new Array(0);
var itens = new Array(0);

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

var texturas = Sprites(
    {
        context: CONTEXT,
        height: 32,
        width: 160,
        image: TEXTURAS,
        nQuadros: 5
    }
);

function renderizarMapa (mapa) {
    for (let i = 0; i < mapa.length; i++) {   ///linhas
        for (let i2 = 0; i2 < mapa[i].length; i2++) {  //colunas
            var tile = mapa[i][i2];
            var x = i2 * 32;    //Horizontal
            var y = i * 32;     //Vertical
            texturas.renderThis(tile, 0, x, y);
        }
    }
}

function renderizarObjetos () {
    for (let i = 0; i < objColisao.length; i++) {
        objColisao[i].render(objColisao[i].posX, objColisao[i].posY, 0);
    }
    for (let i = 0; i < itens.length; i++) {
        itens[i].sprite.render(itens[i].sprite.posX, itens[i].sprite.posY, 0);
    }
}

function block (obj1, obj2) {
    //se inverter a ordem so parametros = empurrar

    //obj1  : personagem
    //obj2  : objeto
    //catetos: armazenam a distancia entre os elementos no eixo X e Y

    if (obj1 == undefined || obj2 == undefined) {
        console.log('obj1 ou obj2 indefinidos');
        return false;
    }

    var distX = obj1.centerX() - obj2.centerX(); //distancia entre o centros dos objetos
    var distY = obj1.centerY() - obj2.centerY(); //distancia entre o centros dos objetos

    //tamanho da soma das metades dos elementos (altura e largura)
    var sumHalfWidth = obj1.halfWidth() + obj2.halfWidth();
    var sumHalfHeight = obj1.halfHeight() + obj2.halfHeight();

    //quando a distância do centro dos objetos for menor que a soma das larguras = colisao

    if (Math.abs(distX) < sumHalfWidth && Math.abs(distY) < sumHalfHeight) {
        console.log('colisao!!');
        //armazena a diferença quando um objeto invade a area do outro
        var overX = sumHalfWidth - Math.abs(distX);
        var overY = sumHalfHeight - Math.abs(distY);

        //avalia o quadrante em que houve a colisão
        if (overX >= overY) { //colisão por cima ou por baixo
            if (distY > 0) { //de baixo para cima
                obj1.posY += overY;
            } else {    //de cima para baixo
                obj1.posY -= overY;
            }
        } else {    //colisão pela esquerda ou pela direita
            if (distX > 0) { //de direita para esquerda
                obj1.posX += overX;
            } else {    //de esquerda para direita
                obj1.posX -= overX;
            }
        }
        return true;
    }
    return false;
}

function checkCollision (player, mapa) {
    //impede de sair do canvas
    if (player.sprites.posX < 0) {
        player.sprites.posX = 0;
    } else if (player.sprites.posX > mapa.largura - 42) {
        player.sprites.posX = mapa.largura - 42;
    }

    if (player.sprites.posY < 0) {
        player.sprites.posY = 0;
    } else if (player.sprites.posY > mapa.altura - 63) {
        player.sprites.posY = mapa.altura - 63;
    }

    for (let i = 0; i < objColisao.length; i++) {
        block(player.sprites, objColisao[i]);
    }
    for (let i = 0; i < itens.length; i++) {
        if (block(player.sprites, itens[i].sprite)) {
            if (mouseCode == 1 || keyPressList[69]) {
                if (player.usar(itens[i])) {
                    itens = RemoveFromArray(itens, [itens[i]]);
                } else {
                    console.log('não coonseguiu pegar');
                }
            }
        }
    }
}


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

function RandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function RemoveFromArray(arr , forDeletion) {
    return arr = arr.filter(item => !forDeletion.includes(item));
}

function moveValue(from, value) {
    if (value > from) { //se tenta mover um valor maior que o disponivel
        from = 0;
        return from;
    } else {
        from -= value;
        return value;
    }
}

function DistAB(A = [2], B = [2]) {
    return Math.sqrt( Math.pow( (B[0] - A[0]) , 2) + Math.pow( (B[1] - A[1]) , 2) )
}
