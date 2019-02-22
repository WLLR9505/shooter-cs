import { estado, postura } from "../Environment/Characters/character.js";
let v = 3;
class ControlsInterface {
    constructor(mode) {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.run = false;
        this.reload = false;
        this.primaryAction = false;
        this.secondaryAction = false;
        this.x = 0;
        this.y = 0;
        this.mode = mode;
    }
    checkMode() {
        this.mode(this);
    }
}
function checkControls(controlMode, x, y, player) {
    controlMode.checkMode();
    if (controlMode.run) {
        v = player.velocidade;
    }
    else {
        v = 3;
    }
    if (controlMode.reload) {
        player.recarregarArma();
    }
    if (controlMode.up) {
        player.andar('c', [x, y], v);
    }
    else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (controlMode.down) {
        player.andar('b', [x, y], v);
    }
    else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (controlMode.left) {
        player.andar('e', [x, y], v);
    }
    else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (controlMode.right) {
        player.andar('d', [x, y], v);
    }
    else {
        player.postura = postura(player, estado.PARADO_D);
    }
    if (controlMode.primaryAction) {
        player.agir(1, controlMode.x, controlMode.y);
    }
    if (controlMode.secondaryAction) {
        player.agir(2, controlMode.x, controlMode.y);
    }
}
export { checkControls, ControlsInterface };
//# sourceMappingURL=CI.js.map