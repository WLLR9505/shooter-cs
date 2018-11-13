const PARADO_A = 0;
const ANDANDO_A_FRENTE = 1;
const ANDADADO_A_COSTAS = 2;
const ANDANDO_A_ESQUERDA = 3;
const ANDANDO_A_DIREITA = 4;
const PARADO_D = 5;
const ANDANDO_D_FRENTE = 6;
const ANDADADO_D_COSTAS = 7;
const ANDANDO_D_ESQUERDA = 8;
const ANDANDO_D_DIREITA = 9;
const USAVEIS = ['MOCHILA', 'MUNICAO'];
class Mochila {
    constructor(nEspacos, imgSRC) {
        this.slot = new Array();
        this.img = new Image;
        this.img.src = imgSRC;
        this.tipo = 'MOCHILA';
        this.sprite = null;
        this.nEspacos = nEspacos;
    }
    guardar(obj) {
        if (this.slot.length < this.nEspacos) {
            this.slot.unshift(obj);
            this.nEspacos--;
        }
        else {
            console.log('mochila cheia');
        }
    }
}
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
    agir(modo) {
        switch (modo) {
            case 1:
                this.corpo.maoD.atirar();
                break;
            case 2:
                try {
                    if (this.corpo.maoD.attachment[3].atirar() == false) {
                        this.recarregarArma(this.corpo.maoD.attachment[3]);
                    }
                    ;
                }
                catch (_a) {
                    return false;
                }
                break;
        }
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
                pente = arma.pente[2] - arma.pente[0];
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
        if (direcao == 'c') {
            this.postura = postura(this, ANDADADO_D_COSTAS);
            if (mouseY > this.sprites.posY) {
                this.postura = postura(this, ANDANDO_D_FRENTE);
            }
            this.sprites.posY -= v;
        }
        if (direcao == 'b') {
            this.postura = postura(this, ANDANDO_D_FRENTE);
            if (mouseY < this.sprites.posY) {
                this.postura = postura(this, ANDADADO_D_COSTAS);
            }
            this.sprites.posY += v;
        }
        if (direcao == 'e') {
            this.postura = postura(this, ANDANDO_D_ESQUERDA);
            if (mouseX > this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            this.sprites.posX -= v;
        }
        if (direcao == 'd') {
            this.postura = postura(this, ANDANDO_D_DIREITA);
            if (mouseX < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
            this.sprites.posX += v;
        }
        this.sprites.quadroInicial = 1;
        this.sprites.quadroFinal = 2;
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(this.sprites.posX, this.sprites.posY);
    }
    update() {
        var mod = [30, 60];
        if (mouseY < this.sprites.posY) {
            mod[0] = 35;
            this.postura = postura(this, ANDADADO_D_COSTAS);
        }
        else {
            if (mouseX > this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            if (mouseX < this.sprites.posX) {
                mod[0] = 35;
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
        }
        function renderArma(pers) {
            if (pers.corpo.maoD != null) {
                pers.corpo.maoD.anatomia.pArma[0] = pers.sprites.posX + mod[0];
                pers.corpo.maoD.anatomia.pArma[1] = pers.sprites.posY + mod[1];
                drawArma(pers.corpo.maoD, CONTEXT, [mouseX, mouseY]);
                return pers;
            }
        }
        function renderPersonagem(pers) {
            pers.sprites.update();
            pers.sprites.render(pers.sprites.posX, pers.sprites.posY, pers.postura);
        }
        if (this.postura == 2 || this.postura == 7) {
            renderArma(this);
            renderPersonagem(this);
        }
        else {
            renderPersonagem(this);
            renderArma(this);
        }
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
const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/militar3P.png';
const BOT_MILITAR_SHEET = new Image();
BOT_MILITAR_SHEET.src = './resources/char/militar1P.png';
const BOT_MILITAR_SHEET2 = new Image();
BOT_MILITAR_SHEET2.src = './resources/char/militar2P.png';
//# sourceMappingURL=personagens.js.map