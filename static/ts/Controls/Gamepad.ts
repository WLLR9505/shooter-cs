import { ControlsInterface } from "./CI.js";
import { player } from "../Environment/entity.js";

var gamepads, gp;


function checkPads (control : ControlsInterface) {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    gamepadCheck(control);
}

function buttonPressed (b) {
    if (b.pressed == true) {
        return true;
    }
}

function gamepadCheck (control : ControlsInterface) {
    try {
        if (gamepads[0] == undefined) { return; }
    } catch (e) {
        return;
    }

    gp = gamepads[0]; //armazena em 'gp' o gamepad ativo

    control.run = buttonPressed(gp.buttons[4])  //correr    - LB
    control.reload = buttonPressed(gp.buttons[5])  //recarregar    - RB
    control.take = buttonPressed(gp.buttons[3])  //pegar    - Y

    control.primaryAction = buttonPressed(gp.buttons[7])  //Ação Primária     - RT
    control.secondaryAction = buttonPressed(gp.buttons[6])  //Ação Secundária   - LT


    //X
    if (gp.axes[0] > 0.5) {
        control.right = true;
    } else {
        control.right = false;
    }
    if (gp.axes[0] < -0.5) {
        control.left = true;
    } else {
        control.left = false;
    }

    // Y
    if (gp.axes[1] > 0.5) {
        control.down = true;
    } else {
        control.down = false;
    }
    if (gp.axes[1] < -0.5) {
        control.up = true;
    } else {
        control.up = false;
    }

    control.x = Math.round(300 * gp.axes[2])  + player.sprites.centerX();       //R x
    control.y = Math.round(300 * gp.axes[3]) + player.sprites.centerY();       //R y

}

export { checkPads }
