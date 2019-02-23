var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cam, updateCam } from "./Engine/camera.js";
import { onMouseMove } from "./Controls/MAK.js";
import { player, loadEntities } from "./Environment/entity.js";
import { renderizarMapa, renderizarObjetos } from "./Engine/render.js";
import { mapaTeste } from "./Environment/map.js";
import { checkCollision, bulletCollision } from "./Engine/physics.js";
import { THECANVAS, CONTEXT } from "./Engine/canvas.js";
import { statusMunicao, updateTiro } from "./Environment/Equipment/weapons.js";
import { RemoveFromArray, DistAB } from "./Tools/tools.js";
import { devInfo, inspect, drawDistPLayerAim } from "./Tools/devTools.js";
import { loadObjects } from "./Environment/objects.js";
import { itens } from "./Environment/items.js";
import { checkControls, loadControls } from "./Controls/CI.js";
import { loadJSON } from "./Tools/jsonLoader.js";
var FPS;
var intervalTime;
var config;
var CONTROLS;
var tirosNoAr = [];
var objColisao = [];
var bots = [];
window.addEventListener('load', function () {
    canvasApp();
});
THECANVAS.addEventListener('mousemove', (e) => {
    onMouseMove(e, cam);
});
function getConfigs(response) {
    return __awaiter(this, void 0, void 0, function* () {
        config = JSON.parse(response);
    });
}
function canvasApp() {
    loadJSON('../../config.json', (response) => {
        getConfigs(response).then(() => {
            CONTROLS = loadControls(config);
            FPS = config.FPS;
            intervalTime = 1000 / FPS;
            loadEntities(bots);
            loadObjects(objColisao);
            console.log('Configurações carregadas com sucesso!');
            gameLoop();
        });
    });
}
function gameLoop() {
    checkControls(CONTROLS, CONTROLS.x, CONTROLS.y, player);
    drawScreen();
    devInfo();
    inspect(tirosNoAr.length);
    drawDistPLayerAim(DistAB([CONTROLS.x, CONTROLS.y], [player.sprites.centerX(), player.sprites.centerY()]), CONTROLS.x - cam.x, CONTROLS.y - cam.y);
    window.setTimeout(gameLoop, intervalTime);
}
function drawScreen() {
    CONTEXT.clearRect(0, 0, THECANVAS.width, THECANVAS.height);
    CONTEXT.save();
    CONTEXT.translate(-cam.x, -cam.y);
    renderBackground();
    renderMain();
    gameEngine();
    CONTEXT.restore();
    renderInterface();
}
function renderBackground() {
    renderizarMapa(mapaTeste.tiles);
    renderizarObjetos(objColisao, itens);
}
function renderMain() {
    player.update(CONTROLS.x, CONTROLS.y);
    bots.forEach((b) => {
        if (b.update([b.cerebro.Mirar.alvo.x, b.cerebro.Mirar.alvo.y], player) == false) {
            bots = RemoveFromArray(bots, [b]);
            console.log('BOT DEVERIA TER MORRIDO');
        }
        if (player.sprites.posY > b.sprites.posY) {
            player.update(CONTROLS.x, CONTROLS.y);
        }
        let bXb = bulletCollision(b.sprites);
        if (bXb != false) {
            tirosNoAr = RemoveFromArray(tirosNoAr, [bXb]);
            console.log(`${b.nome} :: Fui atingido`);
        }
    });
    objColisao.forEach((obj) => {
        let bXo = bulletCollision(obj);
        if (bXo != false) {
            tirosNoAr = RemoveFromArray(tirosNoAr, [bXo]);
        }
    });
    let bXp = bulletCollision(player.sprites);
    if (bXp != false) {
        tirosNoAr = RemoveFromArray(tirosNoAr, [bXp]);
    }
    updateTiro(tirosNoAr, CONTEXT);
}
function gameEngine() {
    checkCollision(player, mapaTeste);
    updateCam(player, mapaTeste);
}
function renderInterface() {
    statusMunicao(player, CONTEXT);
}
export { tirosNoAr, objColisao, bots, CONTROLS };
//# sourceMappingURL=main.js.map