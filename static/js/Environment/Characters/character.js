import { Sprites } from '../../Engine/sprites.js';
var estado;
(function (estado) {
    estado[estado["PARADO_A"] = 0] = "PARADO_A";
    estado[estado["ANDANDO_A_FRENTE"] = 1] = "ANDANDO_A_FRENTE";
    estado[estado["ANDADADO_A_COSTAS"] = 2] = "ANDADADO_A_COSTAS";
    estado[estado["ANDANDO_A_ESQUERDA"] = 3] = "ANDANDO_A_ESQUERDA";
    estado[estado["ANDANDO_A_DIREITA"] = 4] = "ANDANDO_A_DIREITA";
    estado[estado["PARADO_D"] = 5] = "PARADO_D";
    estado[estado["ANDANDO_D_FRENTE"] = 6] = "ANDANDO_D_FRENTE";
    estado[estado["ANDADADO_D_COSTAS"] = 7] = "ANDADADO_D_COSTAS";
    estado[estado["ANDANDO_D_ESQUERDA"] = 8] = "ANDANDO_D_ESQUERDA";
    estado[estado["ANDANDO_D_DIREITA"] = 9] = "ANDANDO_D_DIREITA";
})(estado || (estado = {}));
const ANDAR_PARAMS = [
    ['c', estado.ANDADADO_D_COSTAS, -1],
    ['b', estado.ANDANDO_A_FRENTE, 1],
    ['e', estado.ANDANDO_D_ESQUERDA, -1],
    ['d', estado.ANDANDO_A_DIREITA, 1]
];
const USAVEIS = ['MOCHILA', 'MUNICAO'];
;
var corpoNULL = {
    maoD: null,
    maoE: null,
    torax: null,
    costas: null,
    cabeca: null
};
class Personagem {
    constructor(nome, velocidade, energia, vida = [2], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.corpo = corpoNULL;
        this.sprites = Sprites(spriteParams);
        this.postura = 5;
    }
    spawn(x, y) {
        this.sprites.render(x, y);
    }
    equipar(arma) {
        if (this.corpo.maoD == null) {
            this.corpo.maoD = arma;
            this.corpo.maoD.anatomia.pArma[0] = this.sprites.posX + 20;
            this.corpo.maoD.anatomia.pArma[1] = this.sprites.posY + 45;
            this.postura -= 5;
        }
    }
    usar(obj) {
        if (obj == null) {
            return false;
        }
        if (USAVEIS.includes(obj.tipo)) {
            switch (obj.tipo) {
                case 'MOCHILA':
                    this.corpo.costas = obj;
                    return true;
                case 'MUNICAO':
                    if (this.guardar(obj)) {
                        return true;
                    }
            }
        }
    }
    guardar(obj) {
        try {
            this.corpo.costas.guardar(obj);
            return true;
        }
        catch (_a) {
            console.log('não tem inventário');
        }
    }
    recarregarArma(arma = this.corpo.maoD) {
        let pente = 0;
        if (arma.pente[0] == arma.pente[2]) {
            return true;
        }
        if (this.corpo.costas == null) {
            return false;
        }
        for (let i = 0; i < this.corpo.costas.slot.length; i++) {
            if (this.corpo.costas.slot[i].compatibilidade == arma.categoria) {
                if (arma.categoria == 1) {
                    pente = 1;
                }
                else {
                    pente = arma.pente[2] - arma.pente[0];
                }
                if (pente > this.corpo.costas.slot[i].qtde) {
                    pente = this.corpo.costas.slot[i].qtde;
                    this.corpo.costas.slot[i].qtde = 0;
                }
                else {
                    this.corpo.costas.slot[i].qtde -= pente;
                }
                arma.pente[1] = this.corpo.costas.slot[i].qtde;
                arma.recarregar(pente);
                return true;
            }
        }
    }
    andar(direcao, v) {
        ANDAR_PARAMS.forEach((ap) => {
            if (ap[0] == direcao) {
                this.postura = postura(this, ap[1]);
                if (ap[0] == 'c' || ap[0] == 'b') {
                    this.sprites.posY += (v * ap[2]);
                }
                if (ap[0] == 'e' || ap[0] == 'd') {
                    this.sprites.posX += (v * ap[2]);
                }
            }
        });
        this.sprites.quadroInicial = 1;
        this.sprites.quadroFinal = 2;
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(this.sprites.posX, this.sprites.posY);
    }
}
function postura(pers, e) {
    if (pers.corpo.maoD == null) {
        return e;
    }
    else {
        return e - 5;
    }
}
export { Personagem, postura, estado, USAVEIS };
//# sourceMappingURL=character.js.map