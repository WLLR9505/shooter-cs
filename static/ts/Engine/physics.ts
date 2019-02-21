import { tirosNoAr, objColisao } from '../main.js';
import { itens } from '../Environment/items.js';

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
        // return false;
    }
    return false;
}

function checkCollision (entidade, mapa) {        //verifica colisões entre objetos físicos
    //impede de sair do canvas
    if (entidade.sprites.posX < 0) {
        entidade.sprites.posX = 0;
    } else if (entidade.sprites.posX > mapa.largura - 42) {
        entidade.sprites.posX = mapa.largura - 42;
    }

    if (entidade.sprites.posY < 0) {
        entidade.sprites.posY = 0;
    } else if (entidade.sprites.posY > mapa.altura - 63) {
        entidade.sprites.posY = mapa.altura - 63;
    }

    //colisão com entidade x objetos
    objColisao.forEach((obC) => {
        if (block(entidade.sprites, obC)) {
            console.log('colidiu com objeto :: ' + obC );
        }
    });

    //colisão com entidade x itenss
    itens.forEach((itm) => {
        if (block(entidade.sprites, itm.sprite)) {
            console.log('colidiu com um item :: ' + itm);
        }
    });
            // NOTE: VERIFIFAR POR PROXIMIDADE
            // if (mouseCode == 1 || keyPressList[69]) {
            //     if (entidade.usar(itens[i])) {
            //         itens = RemoveFromArray(itens, [itens[i]]);
            //     } else {
            //         console.log('não conseguiu pegar');
            //     }
            // }
}

function bulletCollision(ob) {
    let b = false;
        tirosNoAr.forEach((t) => {
            if (block(ob, t)) {
                console.log('bala colidiu com ALGO');
                b = t; //se colidir em algo, retorna a bala para remoção
            }
        })
        return b;   //retorna a bala que colidiu, ou false caso não haja colisão
}

export { block, checkCollision, bulletCollision }
