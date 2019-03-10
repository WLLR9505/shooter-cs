import { Bot } from "./Characters/bots.js";
import { CONTEXT } from "../Engine/canvas.js";
import { FMB, SMMB, atc_miraTatica, mochila_B, municao_FUZIL, municao_SHOTGUN, fuzil1, shotgunLonga, mochila_C } from "./items.js";
import { CopyObj } from "../Tools/tools.js";
import { Player } from "./Characters/player.js";
const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/Characters/militar3P.png';
const BOT_MILITAR_SHEET = new Image();
BOT_MILITAR_SHEET.src = './resources/Characters/militar1P.png';
const BOT_MILITAR_SHEET2 = new Image();
BOT_MILITAR_SHEET2.src = './resources/Characters/militar2P.png';
var bot_militar_1 = new Bot('Bot Militar 1', 7, 5, [10, 10], {
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
});
var bot_militar_2 = new Bot('Bot Militar 2', 7, 5, [10, 10], {
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
});
var player = new Player('Militar 1', 7, 5, [10, 10], {
    width: 198,
    height: 930,
    image: MILITAR_SHEET,
    context: CONTEXT,
    TporQuadro: 6,
    nQuadros: 3,
    nLinhas: 10,
    posX: 500,
    posY: 77,
    loop: true
});
function loadEntities(bots) {
    var testArma = FMB;
    testArma.ConectarAnexo(SMMB);
    testArma.ConectarAnexo(atc_miraTatica);
    player.equipar(testArma);
    bot_militar_1.usar(mochila_B);
    bot_militar_1.guardar(CopyObj(municao_SHOTGUN));
    bot_militar_1.equipar(shotgunLonga);
    bot_militar_2.usar(mochila_C);
    bot_militar_2.guardar(CopyObj(municao_FUZIL));
    bot_militar_2.equipar(fuzil1);
    bots.push(bot_militar_1, bot_militar_2);
}
export { player, loadEntities };
//# sourceMappingURL=entity.js.map