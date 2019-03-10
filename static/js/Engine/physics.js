import { tirosNoAr, objColisao } from '../main.js';
import { itens } from '../Environment/tobi.js';
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
function checkCollision(entidade, mapa) {
    if (entidade.sprites.posX < 0) {
        entidade.sprites.posX = 0;
    }
    else if (entidade.sprites.posX > mapa.largura - 42) {
        entidade.sprites.posX = mapa.largura - 42;
    }
    if (entidade.sprites.posY < 0) {
        entidade.sprites.posY = 0;
    }
    else if (entidade.sprites.posY > mapa.altura - 63) {
        entidade.sprites.posY = mapa.altura - 63;
    }
    objColisao.forEach((obC) => {
        if (block(entidade.sprites, obC)) {
            console.log('colidiu com objeto :: ' + obC);
        }
    });
    itens.forEach((itm) => {
        if (block(entidade.sprites, itm.sprite)) {
            console.log('colidiu com um item :: ' + itm);
        }
    });
}
function bulletCollision(ob) {
    let b = false;
    tirosNoAr.forEach((t) => {
        if (block(ob, t)) {
            console.log('bala colidiu com ALGO');
            b = t;
        }
    });
    return b;
}
export { block, checkCollision, bulletCollision };
//# sourceMappingURL=physics.js.map