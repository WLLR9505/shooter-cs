var balaPistola = new Image();
balaPistola.src = './resources/Equipment/Bullets/bala_pistola.png';
var balaFuzil = new Image();
balaFuzil.src = './resources/Equipment/Bullets/bala_fuzil.png';
class Municao {
    constructor(qtde, tipo, compatibilidade, sprite) {
        this.qtde = qtde;
        this.tipo = tipo;
        this.compatibilidade = compatibilidade;
        this.sprite = sprite;
    }
}
export { Municao, balaFuzil, balaPistola };
//# sourceMappingURL=bullets.js.map