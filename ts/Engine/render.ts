import { Sprites } from './sprites.js'
import { CONTEXT } from './canvas.js'
import { TEXTURAS, } from '../Environment/map.js';

var texturas = Sprites(
    {
        context: CONTEXT,
        height: 32,
        width: 160,
        image: TEXTURAS,
        nQuadros: 5
    }
);

function renderizarMapa (mapa : number[][]) {
    for (let i = 0; i < mapa.length; i++) {   ///linhas
        for (let i2 = 0; i2 < mapa[i].length; i2++) {  //colunas
            var tile = mapa[i][i2];
            var x = i2 * 32;    //Horizontal
            var y = i * 32;     //Vertical
            texturas.renderThis(tile, 0, x, y);
        }
    }
}

function renderizarObjetos (obj : any[], itm : any[]) {
    obj.forEach((o) => {
        o.render(o.posX, o.posY, 0)
    });
    itm.forEach((i) => {
        i.sprite.render(i.sprite.posX, i.sprite.posY, 0)
    })
}

export { renderizarMapa, renderizarObjetos }
