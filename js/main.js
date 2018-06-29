const THECANVAS = document.getElementById('canvas');
const CONTEXT = THECANVAS.getContext('2d');
const FPS = 30;
var intervalTime = 1000 / FPS;

window.addEventListener('load', function () {
    canvasApp();
});

function gameLoop () {
    drawScreen();
    drawFPS(THECANVAS, CONTEXT);
    window.setTimeout(gameLoop, intervalTime);
}

function canvasApp () {
    gameLoop();
}

function drawScreen () {
    CONTEXT.fillStyle = '#0099FF';
    CONTEXT.fillRect(0, 0, 600, 300);
}
