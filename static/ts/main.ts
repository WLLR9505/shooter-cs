import { cam, updateCam } from "./Engine/camera.js";
import { onMouseMove } from "./Controls/MAK.js";
import { player, loadEntities } from "./Environment/entity.js";
import { renderizarMapa, renderizarObjetos } from "./Engine/render.js";
import { mapaTeste } from "./Environment/map.js";
import { checkCollision, bulletCollision } from "./Engine/physics.js";
import { THECANVAS, CONTEXT } from "./Engine/canvas.js";
import { statusMunicao, updateTiro } from "./Environment/Equipment/weapons.js";
import { RemoveFromArray, DistAB, ClearConsoleEvery } from "./Tools/tools.js";
import { devInfo, inspect, drawArea, circleArea, drawDistPLayerAim } from "./Tools/devTools.js";
import { loadObjects } from "./Environment/objects.js";
import { loadItens } from "./Environment/items.js";
import { checkControls, loadControls } from "./Controls/CI.js";
import { loadJSON } from "./Tools/jsonLoader.js";
import { itens } from "./Environment/tobi.js";

var FPS;
var intervalTime;
var config;
var CONTROLS;

//-------------------------------------
//Onde são declarados balas disparadas, objetos com colisão e bots
var tirosNoAr = [];
var objColisao = [];
var bots = [];

window.addEventListener('load', function () {
    canvasApp();
});

THECANVAS.addEventListener('mousemove', (e) => {
    onMouseMove(e, cam);
});

async function getConfigs(response) {
    config = JSON.parse(response);
}

function canvasApp () {
    loadJSON('../../config.json', (response) => {
        getConfigs(response).then(() => {   //só inicia o gameLoop depois de ter carregado o 'config.json'

            CONTROLS = loadControls(config);
            FPS = config.FPS;
            intervalTime = 1000 / FPS;

            loadEntities(bots);
            loadObjects(objColisao);
            loadItens();
            console.log('Configurações carregadas com sucesso!');
            gameLoop();
        });
    });
}

function gameLoop () {
    ClearConsoleEvery(30); //limpa o console
    checkControls(CONTROLS, CONTROLS.x, CONTROLS.y, player);
    drawScreen();         //atualiza os quadros

    //DevTools
    devInfo();  //informações com posição do mouse, da camera, FPS...
    inspect(tirosNoAr.length);
    drawDistPLayerAim(DistAB([ CONTROLS.x, CONTROLS.y ], [ player.sprites.centerX(), player.sprites.centerY() ]), CONTROLS.x -cam.x, CONTROLS.y - cam.y);


    window.setTimeout(gameLoop, intervalTime);
}

function drawScreen () {
    CONTEXT.clearRect(0,0,THECANVAS.width,THECANVAS.height);
    CONTEXT.save();

    CONTEXT.translate(-cam.x, -cam.y);

    renderBackground();     //segundo plano
    renderMain();           //primeiro plano
    gameEngine();           //misc (camera / colisão)

    CONTEXT.restore();

    renderInterface();
}

function renderBackground () {
    renderizarMapa(mapaTeste.tiles);
    renderizarObjetos(objColisao, itens);
}

function renderMain () {

    player.update(CONTROLS.x, CONTROLS.y);
    bots.forEach((b) => {
        if (b.update([ b.cerebro.Mirar.alvo.x, b.cerebro.Mirar.alvo.y ], player) == false) {
            bots = RemoveFromArray(bots, [ b ]);//se o bot morrer não é mais renderizado
            console.log('BOT DEVERIA TER MORRIDO');
        }
        if (player.sprites.posY > b.sprites.posY) {
            player.update(CONTROLS.x, CONTROLS.y);
        }

        let bXb = bulletCollision(b.sprites);   //balas colidem com os bots
        if (bXb != false) {
            tirosNoAr = RemoveFromArray(tirosNoAr, [bXb]);
            console.log(`${b.nome} :: Fui atingido`);
        }
    }); //update de todos os bots

//-------------Colisões---------------
     //BALAS x OBJETOS
    objColisao.forEach((obj) => {
        let bXo = bulletCollision(obj);
        if (bXo != false) {
            tirosNoAr = RemoveFromArray(tirosNoAr, [bXo]);
        }
    })
    //BALAS x PLAYER
    let bXp = bulletCollision(player.sprites);
    if (bXp != false) {
        tirosNoAr = RemoveFromArray(tirosNoAr, [bXp]);
    }
//------------------------------------
    updateTiro(tirosNoAr, CONTEXT);
}

function gameEngine () {
    checkCollision(player, mapaTeste);
    updateCam(player, mapaTeste);
}

function renderInterface () {
    statusMunicao(player, CONTEXT);
}

export { tirosNoAr, objColisao, bots, CONTROLS }
