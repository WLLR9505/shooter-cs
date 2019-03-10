import { player } from "../Environment/entity.js";
var gamepads, gp;
function checkPads(control) {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    gamepadCheck(control);
}
function buttonPressed(b) {
    if (b.pressed == true) {
        return true;
    }
}
function gamepadCheck(control) {
    try {
        if (gamepads[0] == undefined) {
            return;
        }
    }
    catch (e) {
        return;
    }
    gp = gamepads[0];
    control.run = buttonPressed(gp.buttons[4]);
    control.reload = buttonPressed(gp.buttons[5]);
    control.take = buttonPressed(gp.buttons[3]);
    control.primaryAction = buttonPressed(gp.buttons[7]);
    control.secondaryAction = buttonPressed(gp.buttons[6]);
    if (gp.axes[0] > 0.5) {
        control.right = true;
    }
    else {
        control.right = false;
    }
    if (gp.axes[0] < -0.5) {
        control.left = true;
    }
    else {
        control.left = false;
    }
    if (gp.axes[1] > 0.5) {
        control.down = true;
    }
    else {
        control.down = false;
    }
    if (gp.axes[1] < -0.5) {
        control.up = true;
    }
    else {
        control.up = false;
    }
    control.x = Math.round(300 * gp.axes[2]) + player.sprites.centerX();
    control.y = Math.round(300 * gp.axes[3]) + player.sprites.centerY();
}
export { checkPads };
//# sourceMappingURL=Gamepad.js.map