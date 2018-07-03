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
    militar.atirar();
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
        militar.andar('e');
    }
    if (keyPressList[68]) { //D
        militar.andar('d');
    }
    if (keyPressList[83]) { //S
        militar.andar('b');
    }
    if (keyPressList[87]) { //W
        militar.andar('c');
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

var militar = new Personagem('Militar 1', 10, 5, [ 10, 10 ], {
    width: 588,
    height: 63,
    image: MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 14,
    loop: true
}, [ 100, 100 ]);

militar.equipar(pistola);

function drawScreen () {
    CONTEXT.fillStyle = '#0099FF';
    CONTEXT.fillRect(0, 0, 600, 200);

    militar.update();
    updateTiro(tirosNoAr, CONTEXT);
}
