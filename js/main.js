const THECANVAS = document.getElementById('canvas');
const CONTEXT = THECANVAS.getContext('2d');
const FPS = 30;
const ARMA_TESTE = fuzil1;
var intervalTime = 1000 / FPS;
var mouseX, mouseY;
var tirosNoAr = new Array(0);
window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', onMouseMove);
THECANVAS.addEventListener('click', function () {
    drawTiro(balaPistola, ARMA_TESTE, tirosNoAr, [ 300, 150 ], [ mouseX, mouseY ], CONTEXT);
});

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

    drawArma(ARMA_TESTE ,CONTEXT, [ mouseX, mouseY ]);
    updateTiro(tirosNoAr, CONTEXT);
}
