const THECANVAS = document.getElementById('canvas');
const CONTEXT = THECANVAS.getContext('2d');
const FPS = 30;
var intervalTime = 1000 / FPS;
var mouseX, mouseY;

window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', onMouseMove);

function onMouseMove (e) {
    mouseX = e.clientX - THECANVAS.offsetLeft;
    mouseY = e.clientY - THECANVAS.offsetTop;
}

function gameLoop () {
    drawScreen();
    devInfo(THECANVAS, CONTEXT, mouseX, mouseY);
    window.setTimeout(gameLoop, intervalTime);
}

function canvasApp () {
    gameLoop();
}

function drawScreen () {
    CONTEXT.fillStyle = '#0099FF';
    CONTEXT.fillRect(0, 0, 600, 300);
}
