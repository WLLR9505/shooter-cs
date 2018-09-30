const FPS = 30;
const ARMA_TESTE = fuzil1;
var intervalTime = 1000 / FPS;
var e, mouseX, mouseY, mouseCode,
    v = 3;
var tirosNoAr = new Array(0);
var keyPressList = [];
window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', onMouseMove);

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

function checkKeys () {
    if (keyPressList[16]) { //Shift L
        v = militar.velocidade;
    } else {
        v = 3;
    }

    if (keyPressList[82]) {
        militar.recarregarArma();
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

    switch (mouseCode) {
        case 0:
            militar.agir(1);
            break;
        case 1:
            console.log('Middle click');
            break;
        case 2:
            console.log('R click');
            militar.agir(2);
            break;
    }
}

function onMouseMove (e) {
    mouseX = e.clientX + Math.ceil(cam.x);
    mouseY = e.clientY + Math.ceil(cam.y);
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
        posX: 300,
        posY: 300
    });
objColisao.push(mesa);
objColisao.push(mesa2);
itens.push(mochila_C);
itens.push(municao_FUZIL);
itens.push(municao_SUB);

var testArma = FMB;
testArma.ConectarAnexo(SMMB);
testArma.ConectarAnexo(atc_miraTatica);
militar.equipar(testArma);

function drawScreen () {
    CONTEXT.clearRect(0,0,THECANVAS.width,THECANVAS.height);
    CONTEXT.save();

    CONTEXT.translate(-cam.x, -cam.y);
    renderizarMapa(mapaTeste.tiles);
    renderizarObjetos();
    checkCollision(militar, mapaTeste);
    updateCam(militar, mapaTeste);
    militar.update();
    updateTiro(tirosNoAr, CONTEXT);

    CONTEXT.restore();
    statusMunicao(militar, THECANVAS, CONTEXT);
}
