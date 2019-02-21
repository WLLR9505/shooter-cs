import { Sprites } from '../Engine/sprites.js';
import { Mira, Anexo } from './Equipment/attachments.js';
import { Mochila } from './Equipment/backpack.js';
import { Municao } from './Equipment/bullets.js';
import { CONTEXT } from '../Engine/canvas.js';
import { Arma } from './Equipment/weapons.js';
import { Shotgun } from './Equipment/Weapons/shotgun.js';

const CATEGORIA_PISTOLA = 0;
const CATEGORIA_SHOTGUN = 1;
const CATEGORIA_SUB = 2;
const CATEGORIA_FUZIL = 3 ;
const CATEGORIA_SNIPER = 4 ;

enum tipo_Anexo {
    MIRA,
    PENTE,
    CANO,
    ESPECIAL
}

var itens = new Array(0);

//************************************************
// --------------- ARMAS
//************************************************


var pistola = new Arma('P1', [0, 0, 10], 200, 2, 5.5, 10, 2, 'Pistols/pistola_1.png',
    {
        pArma: [0, 0],
        pMao: [4, 9],
        pCano: [21, 6],
        pATCMira: [0, 12]
    }, CATEGORIA_PISTOLA);
var fuzil1 = new Arma('FZ-1A', [0, 0, 30], 1000, 4, 6, 5, 3, 'Rifles/fuzil_1.png',
    {
        pArma: [0, 0],
        pMao: [25, 12],
        pCano: [57, 6],
        pATCMira: [0, 13]
    }, CATEGORIA_FUZIL);
var shotgunCurta = new Shotgun('SHT-C', [0, 0, 5], 300, 13, 4.2, 15, 3,1, 'Shotguns/shotgun_curta.png',
    {
        pArma: [0, 0],
        pMao: [4, 11],
        pCano: [29, 6],
        pATCMira: [0, 15],
        pATCBase: [20, 2]
    }, CATEGORIA_SHOTGUN);
var shotgunLonga = new Shotgun('SHT-L', [0, 0, 7], 400, 7, 4.7, 20, 5, 2, 'Shotguns/shotgun_longa.png',
    {
        pArma: [0, 0],
        pMao: [18, 12],
        pCano: [43, 6],
        pATCMira: [0, 15],
        pATCBase: [20, 2]
    }, CATEGORIA_SHOTGUN);

var FMA = new Arma('FM-A', [0, 0, 20], 1150, 1, 5, 6, 3, 'Rifles/fm-a.png',
    {
        pArma: [0, 0],
        pMao: [30, 12],
        pCano: [55, 6],
        pATCMira: [10, 15],
        pATCBase: [15, 2],
        pATCEspecial: [5, 2]
    }, CATEGORIA_FUZIL);

var SMMA = new Arma('SMM-A', [0, 0, 25], 670, 2.7, 5.5, 5, 2, 'SMG/smm-a.png',
    {
        pArma: [0, 0],
        pMao: [30, 12],
        pCano: [50, 6],
        pATCMira: [-5, 15]
    }, CATEGORIA_SUB, tipo_Anexo.ESPECIAL);

var FMB = new Arma('FM-B', [0, 0, 35], 1270, 2, 6, 4, 3, 'Rifles/fm-b.png',
    {
        pArma: [0, 0],
        pMao: [30, 12],
        pCano: [55, 6],
        pATCMira: [5, 15],
        pATCBase: [15, 5],
        pATCEspecial: [5, 4]
    }, CATEGORIA_FUZIL);

var SMMB = new Arma('SMM-B', [0, 0, 20], 1085, 3, 5, 4.5, 2, 'SMG/smm-b.png',
    {
        pArma: [0, 0],
        pMao: [30, 12],
        pCano: [50, 6],
        pATCMira: [-5, 15]
    }, CATEGORIA_SUB, tipo_Anexo.ESPECIAL);


//************************************************
// --------------- MIRAS
//************************************************


var miraComum = new Mira('Mira Comum', 0, 'mira_comum.png');
var atc_miraComum = new Anexo('Mira Comum', tipo_Anexo.MIRA, undefined, miraComum);

var miraPontoVermelho = new Mira('Ponto Vermelho', 1, 'mira_ponto_vermelho.png', 'atc_ponto_vermelho.png');
var atc_miraPontoVermelho = new Anexo('Ponto Vermelho', tipo_Anexo.MIRA, undefined, miraPontoVermelho);

var miraTatica = new Mira('Mira Tatica', 1, 'mira_tatica.png', 'atc_tatica.png');
var atc_miraTatica = new Anexo('Mira Tatica', tipo_Anexo.MIRA, undefined, miraTatica);

var mira2 = new Mira('Luneta 2x', 2, 'mira_tatica.png', 'atc_luneta_2x.png');
var atc_luneta2 = new Anexo('Luneta 2x', tipo_Anexo.MIRA, undefined, mira2);

var mira4 = new Mira('Luneta 4x', 4,'mira_tatica.png', 'atc_luneta_4x.png');
var atc_luneta4 = new Anexo('Luneta 4x', tipo_Anexo.MIRA, undefined, mira4);

var mira8 = new Mira('Luneta 8x', 8,'mira_tatica.png', 'atc_luneta_8x.png');
var atc_luneta8 = new Anexo('Luneta 8x', tipo_Anexo.MIRA, undefined, mira8);


//************************************************
// --------------- ANEXOS
//************************************************


var atc_apoio = new Anexo('Apoio Tatico', tipo_Anexo.CANO, 'apoio_tatico.png', undefined);


//************************************************
// --------------- MOCHILAS
//************************************************


var MOCHILA_A = new Image();
MOCHILA_A.src = './resources/Equipment/mochila_a.png';
var SPRITEmochila_a = Sprites(
    {
        context: CONTEXT,
        image: MOCHILA_A,
        width: 21,
        height: 18,
        posX: 528,
        posY: 244
    });
var mochila_A = new Mochila(5, './resources/Equipment/mochila_a.png');
    mochila_A.sprite = SPRITEmochila_a;

var MOCHILA_B = new Image();
MOCHILA_B.src = './resources/Equipment/mochila_b.png';
var SPRITEmochila_b = Sprites(
    {
        context: CONTEXT,
        image: MOCHILA_B,
        width: 17,
        height: 15,
        posX: 528,
        posY: 244
    });
var mochila_B = new Mochila(10, './resources/Equipment/mochila_b.png');
    mochila_B.sprite = SPRITEmochila_b;

var MOCHILA_C = new Image();
MOCHILA_C.src = './resources/Equipment/mochila_c.png';

var SPRITEmochila_c = Sprites(
    {
        context: CONTEXT,
        image: MOCHILA_C,
        width: 21,
        height: 18,
        posX: 528,
        posY: 244
    });
var mochila_C = new Mochila(15, './resources/Equipment/mochila_c.png');
    mochila_C.sprite = SPRITEmochila_c;


//************************************************
// --------------- MUNICAO
//************************************************


var img_MUNICAO_FUZIL = new Image();
img_MUNICAO_FUZIL.src = './resources/Equipment/Ammo/municao_FUZIL.png';
var municao_FUZIL = new Municao(90, 'MUNICAO', CATEGORIA_FUZIL, Sprites({
    context: CONTEXT,
    image: img_MUNICAO_FUZIL,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));

var img_MUNICAO_SHOTGUN = new Image();
img_MUNICAO_SHOTGUN.src = './resources/Equipment/Ammo/municao_SHOTGUN.png';
var municao_SHOTGUN = new Municao(90, 'MUNICAO', CATEGORIA_SHOTGUN, Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SHOTGUN,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));

var img_MUNICAO_PISTOLA = new Image();
img_MUNICAO_PISTOLA.src = './resources/Equipment/Ammo/municao_PISTOLA.png';
var municao_PISTOLA = new Municao(90, 'MUNICAO', CATEGORIA_PISTOLA, Sprites({
    context: CONTEXT,
    image: img_MUNICAO_PISTOLA,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));

var img_MUNICAO_SNIPER = new Image();
img_MUNICAO_SNIPER.src = './resources/Equipment/Ammo/municao_SNIPER.png';
var municao_SNIPER = new Municao(90, 'MUNICAO', CATEGORIA_SNIPER, Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SNIPER,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));

var img_MUNICAO_SUB = new Image();
img_MUNICAO_SUB.src = './resources/Equipment/Ammo/municao_SUB.png';
var municao_SUB = new Municao(90, 'MUNICAO', CATEGORIA_SUB, Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SUB,
    width: 23,
    height: 12,
    posX: 256,
    posY: 209
}));



itens.push(mochila_C, municao_FUZIL, municao_SUB);



export {
    pistola, fuzil1, shotgunCurta, shotgunLonga, FMA, SMMA, FMB, SMMB, atc_miraComum, atc_miraTatica, atc_luneta2, atc_luneta4, atc_luneta8, mochila_A, mochila_B, mochila_C, municao_PISTOLA, municao_SUB, municao_SHOTGUN, municao_FUZIL, municao_SNIPER, itens
}
