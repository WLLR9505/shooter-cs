import { Sprites, I_sprites } from '../../Engine/sprites.js';
import { DistAB } from '../../Tools/tools.js';
import { postura, estado, Personagem } from './character.js';
import { mouseX, mouseY } from '../../Controls/MAK.js';
import { drawArma } from '../Equipment/weapons.js';
import { CONTEXT } from '../../Engine/canvas.js';

var corpoNULL : Corpo  = {
	maoD: null,
	maoE: null,
	torax: null,
	costas: null,
	cabeca: null
};

var cerebroNULL : Cerebro = {
    seguir: null,
	matar : null,
	Mirar : {
		mirar : false,
		alvo: { x : 0,
				y : 0 }
	}
};

interface Foco {
	mirar : boolean,
	alvo : {
		x: Number,
		y: Number
	}
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
	matar : boolean;
	Mirar : Foco;
};

class Bot extends Personagem {
	cerebro : Cerebro;
	corpo : Corpo;
    constructor(nome, velocidade, energia, vida = [2], spriteParams) {
        super(nome, velocidade, energia, vida, spriteParams)
        this.corpo = Object.assign({}, corpoNULL);
        this.cerebro = Object.assign({}, cerebroNULL);
    }
    update(alvo, player) {
        IA(player, this);

		if (this.vida[0] < 1) {
			console.log(`bot ${this.nome} morreu`);
			return false;
		}

        if (alvo[1] < this.sprites.posY) {
            this.postura = postura(this, estado.ANDADADO_D_COSTAS);
        } else {
            if (alvo[0] > this.sprites.posX) {    //mira a direita
                this.postura = postura(this, estado.ANDANDO_D_DIREITA);
            }
            if (alvo[0] < this.sprites.posX) {
                this.postura = postura(this, estado.ANDANDO_D_ESQUERDA);
            }
        }

        function renderArma(bot) {
            if (bot.corpo.maoD != null) {
                bot.corpo.maoD.anatomia.pArma[0] = bot.sprites.posX + 30;
                bot.corpo.maoD.anatomia.pArma[1] = bot.sprites.posY + 60;

                drawArma(bot.corpo.maoD, CONTEXT, [alvo[0], alvo[1]], true);
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
			//Pensamento
				//Foco no inimigo
				let distAlvo = DistAB([bot.sprites.posX, bot.sprites.posY], [player.sprites.posX, player.sprites.posY])
			if (distAlvo < 500) {	//Se estiver no campo de visão, aponta a arma e se aproxima
				bot.cerebro.Mirar.mirar = true;
				bot.cerebro.seguir = true;

				try {
					if (distAlvo < bot.corpo.maoD.alcance) { //se estiver no alcance da arma, para de seguir e atira
					bot.cerebro.matar = true;
					bot.cerebro.seguir = false;
					}
				} catch {
					console.log(bot.nome + ' :: Não posso atirar!');
				}
			} else {
				bot.cerebro.Mirar.mirar = false;
				bot.cerebro.matar = false;
				bot.cerebro.seguir = false;
			}


			//Ação
            if (bot.cerebro.seguir) {
				console.log(`${bot.nome} :: Engajado no inimigo!`);
                bot.IA_seguir(player);
            }
			if (bot.cerebro.Mirar.mirar) {
				console.log(`${bot.nome} :: Alvo na mira`);
				bot.IA_mirar(player);
			}
			if (bot.cerebro.matar) {
				bot.IA_matar();
			}
        }

		return true;
    }
    IA_seguir(alvo) {
        if (this.sprites.posX - 50 >= alvo.sprites.posX) {	//está a esquerda
            this.andar('e', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, estado.PARADO_D);
        }
        if (this.sprites.posX + 50 <= alvo.sprites.posX) {	//está a direita
            this.andar('d', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, estado.PARADO_D);
        }

        if (this.sprites.posY -50 >= alvo.sprites.posY) {	//está abaixo
            this.andar('c', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, estado.PARADO_D);
        }
        if (this.sprites.posY + 50 <= alvo.sprites.posY) {	//está acima
            this.andar('b', [mouseX, mouseY], 3)
        } else {
            this.postura = postura(this, estado.PARADO_D);
        }
    }
	IA_mirar(player) {
		this.cerebro.Mirar.alvo.x = player.sprites.posX;
		this.cerebro.Mirar.alvo.y = player.sprites.posY + 30;
	}
	IA_matar() {
		if (this.corpo.maoD.atirar(this.cerebro.Mirar.alvo.x, this.cerebro.Mirar.alvo.y) == false) {
			this.recarregarArma();
		} else {
			this.corpo.maoD.atirar(this.cerebro.Mirar.alvo.x, this.cerebro.Mirar.alvo.y);
		}
	}
}

export { Bot }
