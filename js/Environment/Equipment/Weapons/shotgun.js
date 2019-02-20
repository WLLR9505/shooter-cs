import { Arma, tirosNoAr, drawTiro, BALAS } from "../weapons.js";
import { Repeat } from "../../../Tools/tools.js";
import { CONTEXT } from "../../../Engine/canvas.js";
class Shotgun extends Arma {
    constructor(nome, pente, alcance, precisao, velocidadeTiro, taxaTiros, dispersao, nAttachment, imgNome, anatomia, categoria, tipo) {
        super(nome, pente, alcance, precisao, velocidadeTiro, taxaTiros, nAttachment, imgNome, anatomia, categoria, tipo);
        this.dispersao = dispersao;
    }
    atirar(X, Y) {
        if (this.pente[0] > 0) {
            if (this.taxaTiros[0] == 0) {
                Repeat(this.dispersao, () => {
                    drawTiro(BALAS[this.categoria][1], this, tirosNoAr, [X, Y], CONTEXT);
                });
                this.pente[0] -= 1;
                this.taxaTiros[0] = this.taxaTiros[1];
            }
            else {
                this.taxaTiros[0]--;
                if (this.taxaTiros[0] < 0) {
                    this.taxaTiros[0] = 0;
                }
            }
        }
        else {
            console.log('SHOTGUN sem municao');
            return false;
        }
    }
}
export { Shotgun };
//# sourceMappingURL=shotgun.js.map