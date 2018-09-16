
//Indicam o postura do personagem, os valores se referem a linha no sprite com a respectivo postura
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


class Personagem {
	nome: any;
	velocidade: any;
	energia: any;
	arma: any;
    vida: number[];
	sprites: I_sprites;
	postura: number;
    constructor (nome, velocidade, energia, vida = [ 2 ], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.arma = null;
        this.sprites = Sprites(spriteParams);
        this.postura = 5;    //parado desarmado
    }
    spawn (x, y) {
        this.sprites.render(x, y);
    }
    agir (modo) { // 1 : primario 2 : secundario
        switch (modo) {
            case 1:
                this.arma.atirar();
                break;
            case 2:
                this.arma.especial();
                break;
        }
    }
    equipar (arma) {
        if (this.arma == null) {
            this.arma = arma;
            this.arma.anatomia.pArma[0] = this.sprites.posX + 20;
            this.arma.anatomia.pArma[1] = this.sprites.posY + 45;
            this.postura -= 5;   //todos os posturas armados sao (desarmado - 5)
        }
    }
    andar (direcao, v) {
        if (direcao == 'c') {
            this.postura = postura(this, ANDADADO_D_COSTAS);
            if (mouseY > this.sprites.posY) {
                //anda para cima olhando para baixo
                this.postura = postura(this, ANDANDO_D_FRENTE);
            }
            this.sprites.posY -= v;
        }
        if (direcao == 'b') {
            this.postura = postura(this, ANDANDO_D_FRENTE);
            if (mouseY < this.sprites.posY) {
                //anda para baixo olhando para cima
                this.postura = postura(this, ANDADADO_D_COSTAS);
            }
            this.sprites.posY += v;
        }
        if (direcao == 'e') {
            this.postura = postura(this, ANDANDO_D_ESQUERDA);
            if (mouseX > this.sprites.posX) {
                //anda para esquerda olhando para direita
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            this.sprites.posX -= v;
        }
        if (direcao == 'd') {
            this.postura = postura(this,ANDANDO_D_DIREITA);
            if (mouseX < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
                //anda para direita olhando para esquerda
            }
            this.sprites.posX += v;
        }

        //quadros de movimento
        this.sprites.quadroInicial = 1;
        this.sprites.quadroFinal = 2;

        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(this.sprites.posX, this.sprites.posY);
    }
    update () {
        if (mouseY < this.sprites.posY) {
            this.postura = postura(this, ANDADADO_D_COSTAS);
        } else {
            if (mouseX > this.sprites.posX) {    //mira a direita
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            if (mouseX < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
        }

        function renderArma (pers) {
            if (pers.arma != null) {
                pers.arma.anatomia.pArma[0] = pers.sprites.posX + 20;
                pers.arma.anatomia.pArma[1] = pers.sprites.posY + 45;

                drawArma(pers.arma, CONTEXT, [ mouseX, mouseY ]);
                return pers;
            }
        }
        function renderPersonagem (pers) {
            pers.sprites.update();
            pers.sprites.render(pers.sprites.posX, pers.sprites.posY, pers.postura);
        }

        //utilizado para "layer" com a arma (a frente ou atrás)
        if (this.postura == 2 || this.postura == 7) {
            //arma ao fundo
            renderArma(this);
            renderPersonagem(this);
        } else {
            renderPersonagem(this);
            renderArma(this);
        }
    }
}

function postura (pers, e) {
    //uso: a considerar postura desarmada, ja que a postura armada é a desarmada - 5
    if (pers.arma == null) { //desarmado
        return e;
    } else {
        return e - 5;
    }
}

const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/char_militar1_sheet.png';
