import { cam, updateCam } from "./Engine/camera.js";
import { checkKeys, onMouseMove } from "./Controls/MAK.js";
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
import { ControlsInterface, checkControls } from "./Controls/CI.js";
import { checkPads } from "./Controls/Gamepad.js";
const FPS = 50;
var intervalTime = 1000 / FPS;
var MouseAndKeyboard = new ControlsInterface(checkKeys);
var GamepadControl = new ControlsInterface(checkPads);
const CONTROLS = GamepadControl;
var tirosNoAr = [];
var objColisao = [];
var bots = [];
window.addEventListener('load', function () {
    canvasApp();
});
THECANVAS.addEventListener('mousemove', (e) => {
    onMouseMove(e, cam);
});
function canvasApp() {
    gameLoad();
    gameLoop();
}
function gameLoad() {
    loadEntities(bots);
    loadObjects(objColisao);
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