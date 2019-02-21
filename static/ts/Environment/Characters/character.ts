import { Sprites, I_sprites } from '../../Engine/sprites.js';

enum estado {
	PARADO_A,
	ANDANDO_A_FRENTE,
	ANDADADO_A_COSTAS,
	ANDANDO_A_ESQUERDA,
	ANDANDO_A_DIREITA,
	PARADO_D,
	ANDANDO_D_FRENTE,
	ANDADADO_D_COSTAS,
	ANDANDO_D_ESQUERDA,
	ANDANDO_D_DIREITA
}

const USAVEIS : string[] = [ 'MOCHILA', 'MUNICAO' ] ;	//lista de objetos usaveis

interface Corpo {
	maoD : any;
	maoE : any;
	torax : any;
	costas : any;
	cabeca : any;
};

var corpoNULL : Corpo  = {
	maoD: null,
	maoE: null,
	torax: null,
	costas: null,
	cabeca: null
};

class Personagem {
	nome: any;
	velocidade: any;
	energia: any;
	corpo : Corpo;
	arma: any;
    vida: number[];
	sprites: I_sprites;
	postura: number;
    constructor (nome, velocidade, energia, vida = [ 2 ], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
		this.corpo =  corpoNULL;
        this.sprites = Sprites(spriteParams);
        this.postura = 5;    //parado desarmado
    }
    spawn (x, y) {
        this.sprites.render(x, y);
    }
    equipar (arma) {
        if (this.corpo.maoD == null) {
            this.corpo.maoD = arma;
            this.corpo.maoD.anatomia.pArma[0] = this.sprites.posX + 20;
            this.corpo.maoD.anatomia.pArma[1] = this.sprites.posY + 45;
            this.postura -= 5;   //todos os posturas armados sao (desarmado - 5)
        }
    }
	usar (obj) {
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
	guardar (obj) {
		try {
			this.corpo.costas.guardar(obj);
			return true;
		} catch {
			console.log('não tem inventário');
		}
	}
	recarregarArma(arma = this.corpo.maoD) {
		let pente : number = 0;
		if (arma.pente[0] ==  arma.pente[2]) {
			//se o atual for igual ao limite não recarrega
			return true;
		}
		if (this.corpo.costas == null) {
			return false;
		}
		for (let i = 0; i < this.corpo.costas.slot.length; i++) {
			if (this.corpo.costas.slot[i].compatibilidade == arma.categoria) {
				//procura no inventario municao da categoria da arma atual

				//remove a munição do inventario de acordo com o limite do pente

				// nBalas = limite - atual
				pente = arma.pente[2] - arma.pente[0];
				//desconta do total o quanto irá carregar

				if (pente > this.corpo.costas.slot[i].qtde) {	//se precisa de mais balas do que tem
				pente = this.corpo.costas.slot[i].qtde;
				this.corpo.costas.slot[i].qtde = 0
				} else {
					this.corpo.costas.slot[i].qtde -= pente;
				}
				//atualiza o total de balas dessa arma
				arma.pente[1] = this.corpo.costas.slot[i].qtde;
				arma.recarregar(pente);
				return true;
			}
		}
	}
	andar(direcao, olhos = [2], v) {
        if (direcao == 'c') {
            this.postura = postura(this, estado.ANDADADO_D_COSTAS);
            if (olhos[1] > this.sprites.posY) {
                //anda para cima olhando para baixo
                this.postura = postura(this, estado.ANDANDO_D_FRENTE);
            }
            this.sprites.posY -= v;
        }
        if (direcao == 'b') {
            this.postura = postura(this, estado.ANDANDO_D_FRENTE);
            if (olhos[1] < this.sprites.posY) {
                //anda para baixo olhando para cima
                this.postura = postura(this, estado.ANDADADO_D_COSTAS);
            }
            this.sprites.posY += v;
        }
        if (direcao == 'e') {
            this.postura = postura(this, estado.ANDANDO_D_ESQUERDA);
            if (olhos[0] > this.sprites.posX) {
                //anda para esquerda olhando para direita
                this.postura = postura(this, estado.ANDANDO_D_DIREITA);
            }
            this.sprites.posX -= v;
        }
        if (direcao == 'd') {
            this.postura = postura(this, estado.ANDANDO_D_DIREITA);
            if (olhos[0] < this.sprites.posX) {
                this.postura = postura(this, estado.ANDANDO_D_ESQUERDA);
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
}

function postura (pers, e) {
    //uso: a considerar postura desarmada, ja que a postura armada é a desarmada - 5
    if (pers.corpo.maoD == null) { //desarmado
        return e;
    } else {
        return e - 5;
    }
}

export { Personagem, postura, estado, USAVEIS }
