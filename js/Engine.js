var objColisao = new Array(0);

function Sprites (opt) {
    var sprite = {},
        contador = 0;   //quantos quadros se passaram
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
    }

    sprite.halfHeight  = function () {
        // retorna o centro da altura
        return (sprite.height / sprite.nLinhas) / 2;
    }

    sprite.centerX = function () {
        return sprite.posX + sprite.halfWidth();
    }

    sprite.centerY = function () {
        return sprite.posY + sprite.halfHeight();
    }

    return sprite;
}



function renderizarObjetos() {
    for (var i = 0; i < objColisao.length; i++) {
        objColisao[i].render(objColisao[i].posX, objColisao[i].posY, 0);
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

function checkCollision (player) {
    //impede de sair do canvas
    if (player.sprites.posX < 0) {
        player.sprites.posX = 0;
    } else if (player.sprites.posX > THECANVAS.width - 42) {
        player.sprites.posX = THECANVAS.width - 42;
    }

    if (player.sprites.posY < 0) {
        player.sprites.posY = 0;
    } else if (player.sprites.posY > THECANVAS.height - 63) {
        player.sprites.posY = THECANVAS.height - 63;
    }

    for (let i = 0; i < objColisao.length; i++) {
        block(player.sprites, objColisao[i]);
    }
}

function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
