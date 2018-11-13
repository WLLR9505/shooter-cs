var corpoNULL : Corpo  = {
	maoD: null,
	maoE: null,
	torax: null,
	costas: null,
	cabeca: null
};

var cerebroNULL : Cerebro = {
    seguir: null
};

interface Corpo {
	maoD : any;
	maoE : any;
	torax : any;
	costas : any;
	cabeca : any;
};

interface Cerebro {
    seguir : boolean;
};

class Bot {
    nome: any;
    velocidade: any;
    energia: any;
    corpo: Corpo;
    arma: any;
    vida: number[];
    sprites: I_sprites;
    postura: number;
    cerebro: Cerebro;
    constructor(nome, velocidade, energia, vida = [2], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.corpo = Object.assign({}, corpoNULL);
        this.sprites = Sprites(spriteParams);
        this.postura = 5;    //parado desarmado
        this.cerebro = Object.assign({}, cerebroNULL);
    }
    spawn(x, y) {
        this.sprites.render(x, y);
    }
    andar(direcao, olhos = [2], v) {
        if (direcao == 'c') {
            this.postura = postura(this, ANDADADO_D_COSTAS);
            if (olhos[1] > this.sprites.posY) {
                //anda para cima olhando para baixo
                this.postura = postura(this, ANDANDO_D_FRENTE);
            }
            this.sprites.posY -= v;
        }
        if (direcao == 'b') {
            this.postura = postura(this, ANDANDO_D_FRENTE);
            if (olhos[1] < this.sprites.posY) {
                //anda para baixo olhando para cima
                this.postura = postura(this, ANDADADO_D_COSTAS);
            }
            this.sprites.posY += v;
        }
        if (direcao == 'e') {
            this.postura = postura(this, ANDANDO_D_ESQUERDA);
            if (olhos[0] > this.sprites.posX) {
                //anda para esquerda olhando para direita
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            this.sprites.posX -= v;
        }
        if (direcao == 'd') {
            this.postura = postura(this, ANDANDO_D_DIREITA);
            if (olhos[0] < this.sprites.posX) {
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
    update(alvo, player) {
        IA(player, this);
        if (alvo[1] < this.sprites.posY) {
            this.postura = postura(this, ANDADADO_D_COSTAS);
        } else {
            if (alvo[0] > this.sprites.posX) {    //mira a direita
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            if (alvo[0] < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
        }

        function renderArma(bot) {
            if (bot.corpo.maoD != null) {
                bot.corpo.maoD.anatomia.pArma[0] = bot.sprites.posX + 20;
                bot.corpo.maoD.anatomia.pArma[1] = bot.sprites.posY + 45;

                drawArma(bot.corpo.maoD, CONTEXT, [alvo[0], alvo[1]]);
                return bot;
            }
        }
        function renderPersonagem(bot) {
            bot.sprites.update();
            bot.sprites.render(bot.sprites.posX, bot.sprites.posY, bot.postura);
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

        function IA(player, bot) {
            if (bot.cerebro.seguir) {
                bot.IA_seguir(player);
            }
        }
    }
    IA_seguir(alvo) {
        if (this.sprites.posX - 50 >= alvo.sprites.posX) {	//está a esquerda
            this.andar('e', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, PARADO_D);
        }
        if (this.sprites.posX + 50 <= alvo.sprites.posX) {	//está a direita
            this.andar('d', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, PARADO_D);
        }

        if (this.sprites.posY -50 >= alvo.sprites.posY) {	//está abaixo
            this.andar('c', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, PARADO_D);
        }
        if (this.sprites.posY + 50 <= alvo.sprites.posY) {	//está acima
            this.andar('b', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, PARADO_D);
        }
    }

}
