const FPS = 30;
const ARMA_TESTE = fuzil1;
var intervalTime = 1000 / FPS;
var mouseX, mouseY;
var tirosNoAr = new Array(0);
var keyPressList = [];
window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', onMouseMove);
THECANVAS.addEventListener('click', function () {
    drawTiro(balaPistola, ARMA_TESTE, tirosNoAr, [ 300, 150 ], [ mouseX, mouseY ], CONTEXT);
});

document.onkeydown = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e ? e : window.event;
    keyPressList[e.keyCode] = false;
};

function checkKeys () {
    if (keyPressList[65]) { //A
        militar.andar(100, 100);
    }
    if (keyPressList[68]) { //D
        militar.andar(100, 100);
    }
    if (keyPressList[83]) { //S
        militar.andar(100, 100);
    }
    if (keyPressList[87]) { //W
        militar.andar(100, 100);
    }
}

function onMouseMove (e) {
    mouseX = e.clientX - THECANVAS.offsetLeft;
    mouseY = e.clientY - THECANVAS.offsetTop;
}

function gameLoop () {
    checkKeys();
    drawScreen();
    devInfo(THECANVAS, CONTEXT, mouseX, mouseY);
    window.setTimeout(gameLoop, intervalTime);
}

function canvasApp () {
    gameLoop();
}

var militar = new Personagem('Militar 1', 10, 5, [ 10, 10 ], 'char_militar1_sheet.png', {
    width: 210,
    height: 63,
    image: MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 5,
    loop: true
});

function drawScreen () {
    CONTEXT.fillStyle = '#0099FF';
    CONTEXT.fillRect(0, 0, 600, 200);

    militar.spawn(100, 100);
    drawArma(ARMA_TESTE ,CONTEXT, [ mouseX, mouseY ]);
    updateTiro(tirosNoAr, CONTEXT);
}
