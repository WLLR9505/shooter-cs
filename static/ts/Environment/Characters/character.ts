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

const ANDAR_PARAMS : any[] = [
	['c', estado.ANDADADO_D_COSTAS, -1],	//[direção / estado do sprite / fator velocidade]
	['b', estado.ANDANDO_A_FRENTE, 1],
	['e', estado.ANDANDO_D_ESQUERDA, -1],
	['d', estado.ANDANDO_A_DIREITA, 1]
];

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
	readyReload : boolean;
    constructor (nome, velocidade, energia, vida = [ 2 ], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
		this.corpo =  corpoNULL;
        this.sprites = Sprites(spriteParams);
        this.postura = 5;    //parado desarmado
		this.readyReload = true;
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
	guardar (obj) {
		try {
			this.corpo.costas.guardar(obj);
			return true;
		} catch {
			console.log('não tem inventário');
		}
	}
	prontoRecarregar(arma = this.corpo.maoD) {
		arma.readyReload = true;
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
		if (arma.readyReload == false) {	//se arma não estiver pronta para recarregar
			return false;
		}
		for (let i = 0; i < this.corpo.costas.slot.length; i++) {
			if (this.corpo.costas.slot[i].compatibilidade == arma.categoria) {
				//procura no inventario municao da categoria da arma atual

				if (arma.categoria == 1) { //se for uma shotgun (Só uma bala por vez)
					pente = 1;
				} else {
				pente = arma.pente[2] - arma.pente[0]; //quanto precisa para encher o pente (nBalas = limite - atual)
				}

				//desconta do total no inventário o quanto irá carregar
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
	andar(direcao, v) {
		ANDAR_PARAMS.forEach((ap) => {
			if (ap[0] == direcao) {
				this.postura = postura(this, ap[1]);	//atribui a postura de acordo com a direção

				//utiliza o fator de velocidade negativo ou positivo dependendo dad direção
				if (ap[0] == 'c' || ap[0] == 'b') {
					this.sprites.posY += (v * ap[2]);
				}
				if (ap[0] == 'e' || ap[0] == 'd') {
					this.sprites.posX += (v * ap[2]);
				}
			}
		})

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
