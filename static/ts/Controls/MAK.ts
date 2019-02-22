import { ControlsInterface } from "./CI.js";

var mouseX, mouseY, mouseCode, v = 3;
var keyPressList = [];

window.onmousedown = function (e) {
    if (typeof e == 'object') {
        mouseCode = e.button;
    }
};

window.onmouseup = function (e) {
    if (typeof e == 'object') {
        mouseCode = undefined;
    }
};

document.onkeydown = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = false;
};

function checkKeys (control : ControlsInterface) {

    control.run = keyPressList[16]; //Shift L

    control.reload = keyPressList[82]; //R

    control.left = keyPressList[65]; //A
    control.right = keyPressList[68]; //D
    control.down = keyPressList[83]; //S
    control.up = keyPressList[87]; //W

    control.x = mouseX;
    control.y = mouseY;

    switch (mouseCode) {
        case 0:
            control.primaryAction = true;
            break;
        case 1:
            console.log('Middle click');
            break;
        case 2:
            console.log('R click');
            control.secondaryAction = true;
            break;
    }

    if (mouseCode == undefined) {
        control.primaryAction = false;
        control.secondaryAction = false;
    }
}

function onMouseMove (e, cam) {
    mouseX = e.clientX + Math.ceil(cam.x);
    mouseY = e.clientY + Math.ceil(cam.y);
}


export { mouseX, mouseY, mouseCode, keyPressList, onMouseMove, checkKeys }
