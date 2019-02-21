import { I_sprites } from '../../Engine/sprites.js';

var balaPistola = new Image();
balaPistola.src = './resources/Equipment/Bullets/bala_pistola.png';

var balaFuzil = new Image();
balaFuzil.src = './resources/Equipment/Bullets/bala_fuzil.png';

class Municao {
	qtde: number;
	tipo : string;
    sprite : I_sprites;
    compatibilidade : string;
    constructor (qtde, tipo, compatibilidade, sprite) {
        this.qtde = qtde;
        this.tipo = tipo;
        this.compatibilidade = compatibilidade
        this.sprite = sprite;
    }
}

export { Municao, balaFuzil, balaPistola }
