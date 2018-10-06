
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

const USAVEIS = [ 'MOCHILA', 'MUNICAO' ]	//lista de objetos usaveis

class Mochila {
	nEspacos: number;
	slot: any[];
	img: HTMLImageElement;
	tipo: string;
	sprite: I_sprites;
	constructor (nEspacos, imgSRC) {
		this.slot = new Array();
		this.img = new Image;
		this.img.src = imgSRC;
		this.tipo = 'MOCHILA';
		this.sprite = null;
		this.nEspacos = nEspacos;
	}
	guardar (obj) {
		if (this.slot.length < this.nEspacos) {	//se tiver espaço
			this.slot.unshift(obj);
			this.nEspacos--;
		} else {
			console.log('mochila cheia');
		}
	}
}

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
    agir (modo) { // 1 : primario 2 : secundario
        switch (modo) {
            case 1:
                this.corpo.maoD.atirar();
                break;
            case 2:
				try {
                	if (this.corpo.maoD.attachment[3].atirar() == false) {
						this.recarregarArma(this.corpo.maoD.attachment[3]);
					};
				} catch {
					return false;
				}
                break;
        }
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
            if (pers.corpo.maoD != null) {
                pers.corpo.maoD.anatomia.pArma[0] = pers.sprites.posX + 20;
                pers.corpo.maoD.anatomia.pArma[1] = pers.sprites.posY + 45;

                drawArma(pers.corpo.maoD, CONTEXT, [ mouseX, mouseY ]);
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
    if (pers.corpo.maoD == null) { //desarmado
        return e;
    } else {
        return e - 5;
    }
}

const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/char_militar1_sheet.png';
