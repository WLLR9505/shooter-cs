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
function checkKeys(control) {
    control.run = keyPressList[16];
    control.reload = keyPressList[82];
    control.left = keyPressList[65];
    control.right = keyPressList[68];
    control.down = keyPressList[83];
    control.up = keyPressList[87];
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
function onMouseMove(e, cam) {
    mouseX = e.clientX + Math.ceil(cam.x);
    mouseY = e.clientY + Math.ceil(cam.y);
}
export { mouseX, mouseY, mouseCode, keyPressList, onMouseMove, checkKeys };
//# sourceMappingURL=MAK.js.map