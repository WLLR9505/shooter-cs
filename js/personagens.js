class Personagem {
    constructor (nome, velocidade, energia, vida = [ 2 ], spriteParams, posicao = [ 2 ]) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.arma = null;
        this.sprites = Sprites(spriteParams);
        this.posicao = posicao;
    }
    spawn (x, y) {
        this.sprites.render(x, y);
    }
    atirar () {
        drawTiro(balaPistola, this.arma, tirosNoAr, [ mouseX, mouseY ], CONTEXT);
    }
    equipar (arma) {
        if (this.arma == null) {
            this.arma = arma;
            this.arma.anatomia.pArma[0] = this.posicao[0] + 20;
            this.arma.anatomia.pArma[1] = this.posicao[1] + 45;
        }
    }
    andar (direcao) {
        let v = 3;
        if (direcao == 'c') {
            this.sprites.quadroInicial = 12;
            this.sprites.quadroFinal = 13;
            this.posicao[1] -= v;
        }
        if (direcao == 'b') {
            this.sprites.quadroInicial = 9;
            this.sprites.quadroFinal = 10;
            this.posicao[1] += v;
        }
        if (direcao == 'e') {
            this.sprites.quadroInicial = 1;
            this.sprites.quadroFinal = 2;
            this.posicao[0] -= v;
        }
        if (direcao == 'd') {
            this.sprites.quadroInicial = 6;
            this.sprites.quadroFinal = 7;
            this.posicao[0] += v;
        }

        if (this.sprites.quadro < (this.sprites.quadroInicial)) {   //se o quadro atual for muito diferente do quadro inicial, já que se for 0 ele passará por todos os quadros até o inicial
            this.sprites.quadro = this.sprites.quadroInicial - 1;
        }
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(this.posicao[0], this.posicao[1]);
    }
    update () {
        function renderArma (pers) {
            if (pers.arma != null) {
                pers.arma.anatomia.pArma[0] = pers.posicao[0] + 20;
                pers.arma.anatomia.pArma[1] = pers.posicao[1] + 45;

                drawArma(pers.arma, CONTEXT, [ mouseX, mouseY ]);
                return pers;
            }
        }
        function renderPersonagem (pers) {
            pers.sprites.render(pers.posicao[0], pers.posicao[1]);
        }

        //utilizado para "layer" com a arma (a frente ou atrás)
        if (this.sprites.quadro > 9 && this.sprites.quadro < 14) {
            renderArma(this);
            renderPersonagem(this);
        } else {
            renderPersonagem(this);
            renderArma(this);
        }
    }
}

const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/char_militar1_sheet.png';
const MILITARa_SHEET = new Image();
MILITARa_SHEET.src = './resources/char/char_militar1A_sheet.png';
