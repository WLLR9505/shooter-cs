const FPS = 50;
const ARMA_TESTE = fuzil1;
var intervalTime = 1000 / FPS;
var e, mouseX, mouseY, mouseCode,
    v = 3;
var tirosNoAr = new Array(0);
var bots = new Array(0);
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
        v = player.velocidade;
    } else {
        v = 3;
    }

    if (keyPressList[82]) { //R
        player.recarregarArma();
    }


    if (keyPressList[65]) { //A
        player.andar('e', v);
    } else {
        player.postura = postura(player, PARADO_D);
    }
    if (keyPressList[68]) { //D
        player.andar('d', v);
    } else {
        player.postura = postura(player, PARADO_D);
    }
    if (keyPressList[83]) { //S
        player.andar('b', v);
    } else {
        player.postura = postura(player, PARADO_D);
    }
    if (keyPressList[87]) { //W
        player.andar('c', v);
    } else {
        player.postura = postura(player, PARADO_D);
    }

    switch (mouseCode) {
        case 0:
            player.agir(1, mouseX, mouseY);
            break;
        case 1:
            console.log('Middle click');
            break;
        case 2:
            console.log('R click');
            player.agir(2, mouseX, mouseY);
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

var bot_player = new Bot('Bot Militar 1', 7, 5, [ 10, 10 ], {
    width: 198,
    height: 930,
    image: BOT_MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 3,
    nLinhas: 10,
    posX: 1300,
    posY: 300,
    loop: true
}, [ 100, 100 ]);

var bot_player2 = new Bot('Bot Militar 2', 7, 5, [ 10, 10 ], {
    width: 198,
    height: 930,
    image: BOT_MILITAR_SHEET2,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 3,
    nLinhas: 10,
    posX: 1500,
    posY: 300,
    loop: true
}, [ 100, 100 ]);

var player = new Personagem('Militar 1', 7, 5, [ 10, 10 ], {
    width: 198,
    height: 930,
    image: MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 3,
    nLinhas: 10,
    posX: 580,
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
objColisao.push(mesa, mesa2);
itens.push(mochila_C, municao_FUZIL, municao_SUB);
bots.push(bot_player, bot_player2);

var testArma = FMB;
testArma.ConectarAnexo(SMMB);
testArma.ConectarAnexo(atc_miraTatica);
player.equipar(testArma);
player.usar(mochila_B);
player.guardar(municao_FUZIL);
player.guardar(municao_SUB);
player.guardar(municao_SHOTGUN);


bot_player.usar(mochila_B);
bot_player.guardar(municao_FUZIL);
bot_player.equipar(fuzil1);

bot_player2.usar(mochila_B);
bot_player2.guardar(municao_FUZIL);
bot_player2.equipar(fuzil1);

function drawScreen () {
    CONTEXT.clearRect(0,0,THECANVAS.width,THECANVAS.height);
    CONTEXT.save();

    CONTEXT.translate(-cam.x, -cam.y);

    renderBackground();

    gameEngine();

    renderMain();

    drawDistPLayerAim(DistAB([ mouseX, mouseY ], [ player.sprites.posX, player.sprites.posY ]), mouseX, mouseY);
    CONTEXT.restore();

    renderInterface();
}

function renderBackground () {
    renderizarMapa(mapaTeste.tiles);
    renderizarObjetos();
}

function renderMain () {
    player.update();

    bots.forEach((b) => {
        if (b.update([ b.cerebro.Mirar.alvo.x, b.cerebro.Mirar.alvo.y ], player) == false) {
            bots = RemoveFromArray(bots, [ b ]);//se o bot morrer não é mais renderizado
        }
        if (player.sprites.posY > b.sprites.posY) {
            player.update();
        }
        checkCollision(b, mapaTeste);
        block(b.sprites, player.sprites);
    }); //update de todos os bots

    updateTiro(tirosNoAr, CONTEXT);
}

function gameEngine () {
    checkCollision(player, mapaTeste);
    updateCam(player, mapaTeste);
}

function renderInterface () {
    statusMunicao(player, THECANVAS, CONTEXT);
}
