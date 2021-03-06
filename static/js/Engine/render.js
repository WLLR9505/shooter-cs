import { Sprites } from './sprites.js';
import { CONTEXT } from './canvas.js';
import { TEXTURAS, } from '../Environment/map.js';
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
function renderizarObjetos(obj, itm) {
    obj.forEach((o) => {
        o.render(o.posX, o.posY, 0);
    });
    itm.forEach((i) => {
        i.sprite.render(i.sprite.posX, i.sprite.posY, 0);
    });
}
export { renderizarMapa, renderizarObjetos };
//# sourceMappingURL=render.js.map