// import { Sprites, I_sprites } from '../../Engine/sprites.js';
import { drawArma } from '../Equipment/weapons.js';
import { mouseY, mouseX } from '../../Controls/MAK.js';
import { CONTEXT } from '../../Engine/canvas.js';
import { Personagem, postura, estado } from './character.js';


class Player extends Personagem {
    constructor (nome, velocidade, energia, vida = [ 2 ], spriteParams) {
        super(nome, velocidade, energia, vida, spriteParams);
    }
    agir (modo, X, Y) { // 1 : primario 2 : secundario
        switch (modo) {
            case 1:
                this.corpo.maoD.atirar(X, Y);
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

    update () {
		var mod = [30, 60]; //modifica posição da arma de acordo com a direção que olha
        if (mouseY < this.sprites.posY) {
			mod[0] = 35;
            this.postura = postura(this, estado.ANDADADO_D_COSTAS);
        } else {
            if (mouseX > this.sprites.posX) {    //mira a direita
                this.postura = postura(this, estado.ANDANDO_D_DIREITA);
            }
            if (mouseX < this.sprites.posX) {
				mod[0] = 35;
                this.postura = postura(this, estado.ANDANDO_D_ESQUERDA);
            }
        }
        function renderArma (pers) {
            if (pers.corpo.maoD != null) {
                pers.corpo.maoD.anatomia.pArma[0] = pers.sprites.posX + mod[0];
                pers.corpo.maoD.anatomia.pArma[1] = pers.sprites.posY + mod[1];

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


export { Player }
