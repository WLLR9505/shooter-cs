import { drawArma } from '../Equipment/weapons.js';
import { CONTEXT } from '../../Engine/canvas.js';
import { Personagem, postura, estado } from './character.js';
class Player extends Personagem {
    constructor(nome, velocidade, energia, vida = [2], spriteParams) {
        super(nome, velocidade, energia, vida, spriteParams);
    }
    agir(modo, X, Y) {
        switch (modo) {
            case 1:
                this.corpo.maoD.atirar(X, Y);
                break;
            case 2:
                try {
                    if (this.corpo.maoD.attachment[3].atirar(X, Y) == false) {
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
    update(x, y) {
        var mod = [30, 60];
        if (y < this.sprites.posY) {
            mod[0] = 35;
            this.postura = postura(this, estado.ANDADADO_D_COSTAS);
        }
        else {
            if (x > this.sprites.posX) {
                this.postura = postura(this, estado.ANDANDO_D_DIREITA);
            }
            if (x < this.sprites.posX) {
                mod[0] = 35;
                this.postura = postura(this, estado.ANDANDO_D_ESQUERDA);
            }
        }
        function renderArma(pers) {
            if (pers.corpo.maoD != null) {
                pers.corpo.maoD.anatomia.pArma[0] = pers.sprites.posX + mod[0];
                pers.corpo.maoD.anatomia.pArma[1] = pers.sprites.posY + mod[1];
                drawArma(pers.corpo.maoD, CONTEXT, [x, y]);
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
export { Player };
//# sourceMappingURL=player.js.map