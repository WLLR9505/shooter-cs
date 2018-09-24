const FPS = 30;
const ARMA_TESTE = fuzil1;
var intervalTime = 1000 / FPS;
var mouseX, mouseY, mouseCode,
    v = 3;
var tirosNoAr = new Array(0);
var keyPressList = [];
window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', onMouseMove);

window.onmouseup = function (e) {
    if (typeof e == 'object') {
        mouseCode = e.button;

        switch (mouseCode) {
            case 0:
                console.log('L click');
                militar.agir(1);
                break;
            case 1:
                console.log('Middle click');
                break;
            case 2:
                console.log('R click');
                militar.agir(2);
                break;
            default:
                console.log('?? ' + mouseCode);
        }
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

function checkKeys () {
    if (keyPressList[16]) { //Shift L
        v = militar.velocidade;
    } else {
        v = 3;
    }

    if (keyPressList[65]) { //A
        militar.andar('e', v);
    } else {
        militar.postura = postura(militar, PARADO_D);
    }
    if (keyPressList[68]) { //D
        militar.andar('d', v);
    } else {
        militar.postura = postura(militar, PARADO_D);
    }
    if (keyPressList[83]) { //S
        militar.andar('b', v);
    } else {
        militar.postura = postura(militar, PARADO_D);
    }
    if (keyPressList[87]) { //W
        militar.andar('c', v);
    } else {
        militar.postura = postura(militar, PARADO_D);
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

var militar = new Personagem('Militar 1', 7, 5, [ 10, 10 ], {
    width: 126,
    height: 630,
    image: MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 3,
    nLinhas: 10,
    posX: 400,
    posY: 100,
    loop: true
}, [ 100, 100 ]);

var MESA = new Image();
MESA.src = './resources/mesa.png';
var mesa = Sprites(
    {
        context: CONTEXT,
        image: MESA,
        width: 90,
        height: 91,
        posX: 300,
        posY: 100
    });
var mesa2 = Sprites(
    {
        context: CONTEXT,
        image: MESA,
        width: 90,
        height: 91,
        posX: 100,
        posY: 170
    });
objColisao.push(mesa);
// objColisao.push(mesa2);

var testArma = FMA;
testArma.ConectarAnexo(SMMA);
testArma.ConectarAnexo(atc_miraPontoVermelho);
militar.equipar(testArma);

function drawScreen () {
    CONTEXT.clearRect(0,0,THECANVAS.width,THECANVAS.height);
    CONTEXT.save();
    CONTEXT.translate(-cam.x, -cam.y);
    renderizarMapa(mapaTeste.tiles);
    renderizarObjetos();
    checkCollision(militar, mapaTeste);
    updateCam(militar, mapaTeste);
    drawArma(testArma, CONTEXT, [ mouseX, mouseY ]);
    militar.update();
    updateTiro(tirosNoAr, CONTEXT);
    CONTEXT.restore();
}
