var pistola = new Weapon('P1', [0, 0, 10], 30, 2, 5.5, 10, 2, 'pistola_1.png', {
    pArma: [0, 0],
    pMao: [4, 9],
    pCano: [21, 6],
    pATCMira: [0, 12]
}, CATEGORIA_PISTOLA);
var fuzil1 = new Weapon('FZ-1A', [0, 0, 30], 60, 4, 6, 5, 3, 'fuzil_1.png', {
    pArma: [0, 0],
    pMao: [25, 12],
    pCano: [57, 6],
    pATCMira: [0, 13]
}, CATEGORIA_FUZIL);
var shotgunCurta = new Weapon('SHT-C', [0, 0, 5], 50, 7, 4.2, 15, 1, 'shotgun_curta.png', {
    pArma: [0, 0],
    pMao: [4, 11],
    pCano: [29, 6],
    pATCMira: [0, 15],
    pATCBase: [20, 2]
}, CATEGORIA_SHOTGUN);
var shotgunLonga = new Weapon('SHT-L', [0, 0, 7], 55, 6, 4.7, 20, 2, 'shotgun_longa.png', {
    pArma: [0, 0],
    pMao: [18, 12],
    pCano: [43, 6],
    pATCMira: [0, 15],
    pATCBase: [20, 2]
}, CATEGORIA_SHOTGUN);
var FMA = new Weapon('FM-A', [0, 0, 20], 70, 1, 5, 6, 3, 'fm-a.png', {
    pArma: [0, 0],
    pMao: [30, 12],
    pCano: [55, 6],
    pATCMira: [10, 15],
    pATCBase: [15, 2],
    pATCEspecial: [5, 2]
}, CATEGORIA_FUZIL);
var SMMA = new Weapon('SMM-A', [0, 0, 25], 40, 2.7, 5.5, 5, 2, 'smm-a.png', {
    pArma: [0, 0],
    pMao: [30, 12],
    pCano: [50, 6],
    pATCMira: [-5, 15]
}, CATEGORIA_SUB, tipo_Anexo.ESPECIAL);
var FMB = new Weapon('FM-B', [0, 0, 35], 65, 2, 6, 4, 3, 'fm-b.png', {
    pArma: [0, 0],
    pMao: [30, 12],
    pCano: [55, 6],
    pATCMira: [5, 15],
    pATCBase: [15, 5],
    pATCEspecial: [5, 4]
}, CATEGORIA_FUZIL);
var SMMB = new Weapon('SMM-B', [0, 0, 20], 35, 3, 5, 4.5, 2, 'smm-b.png', {
    pArma: [0, 0],
    pMao: [30, 12],
    pCano: [50, 6],
    pATCMira: [-5, 15]
}, CATEGORIA_SUB, tipo_Anexo.ESPECIAL);
var miraComum = new Mira('Mira Comum', 0, 'mira_comum.png');
var atc_miraComum = new Anexo('Mira Comum', tipo_Anexo.MIRA, undefined, miraComum);
var miraPontoVermelho = new Mira('Ponto Vermelho', 1, 'mira_ponto_vermelho.png', 'atc_ponto_vermelho.png');
var atc_miraPontoVermelho = new Anexo('Ponto Vermelho', tipo_Anexo.MIRA, undefined, miraPontoVermelho);
var miraTatica = new Mira('Mira Tatica', 1, 'mira_tatica.png', 'atc_tatica.png');
var atc_miraTatica = new Anexo('Mira Tatica', tipo_Anexo.MIRA, undefined, miraTatica);
var mira2 = new Mira('Luneta 2x', 2, 'mira_tatica.png', 'atc_luneta_2x.png');
var atc_luneta2 = new Anexo('Luneta 2x', tipo_Anexo.MIRA, undefined, mira2);
var mira4 = new Mira('Luneta 4x', 4, 'mira_tatica.png', 'atc_luneta_4x.png');
var atc_luneta4 = new Anexo('Luneta 4x', tipo_Anexo.MIRA, undefined, mira4);
var mira8 = new Mira('Luneta 8x', 8, 'mira_tatica.png', 'atc_luneta_8x.png');
var atc_luneta8 = new Anexo('Luneta 8x', tipo_Anexo.MIRA, undefined, mira8);
var atc_apoio = new Anexo('Apoio Tatico', tipo_Anexo.CANO, 'apoio_tatico.png', undefined);
var MOCHILA_A = new Image();
MOCHILA_A.src = './resources/mochila_a.png';
var SPRITEmochila_a = Sprites({
    context: CONTEXT,
    image: MOCHILA_A,
    width: 21,
    height: 18,
    posX: 528,
    posY: 244
});
var mochila_A = new Mochila(5, './resources/mochila_a.png');
mochila_A.sprite = SPRITEmochila_a;
var MOCHILA_B = new Image();
MOCHILA_B.src = './resources/mochila_b.png';
var SPRITEmochila_b = Sprites({
    context: CONTEXT,
    image: MOCHILA_B,
    width: 17,
    height: 15,
    posX: 528,
    posY: 244
});
var mochila_B = new Mochila(10, './resources/mochila_b.png');
mochila_B.sprite = SPRITEmochila_b;
var MOCHILA_C = new Image();
MOCHILA_C.src = './resources/mochila_c.png';
var SPRITEmochila_c = Sprites({
    context: CONTEXT,
    image: MOCHILA_C,
    width: 21,
    height: 18,
    posX: 528,
    posY: 244
});
var mochila_C = new Mochila(15, './resources/mochila_c.png');
mochila_C.sprite = SPRITEmochila_c;
var img_MUNICAO_FUZIL = new Image();
img_MUNICAO_FUZIL.src = './resources/municao_FUZIL.png';
var municao_FUZIL = new Municao(90, 'MUNICAO', CATEGORIA_FUZIL, SPRITE_municaoFUZIL = Sprites({
    context: CONTEXT,
    image: img_MUNICAO_FUZIL,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));
var img_MUNICAO_SHOTGUN = new Image();
img_MUNICAO_SHOTGUN.src = './resources/municao_SHOTGUN.png';
var municao_SHOTGUN = new Municao(90, 'MUNICAO', CATEGORIA_SHOTGUN, SPRITE_municaoSHOTGUN = Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SHOTGUN,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));
var img_MUNICAO_PISTOLA = new Image();
img_MUNICAO_PISTOLA.src = './resources/municao_PISTOLA.png';
var municao_PISTOLA = new Municao(90, 'MUNICAO', CATEGORIA_PISTOLA, SPRITE_municaoPISTOLA = Sprites({
    context: CONTEXT,
    image: img_MUNICAO_PISTOLA,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));
var img_MUNICAO_SNIPER = new Image();
img_MUNICAO_SNIPER.src = './resources/municao_SNIPER.png';
var municao_SNIPER = new Municao(90, 'MUNICAO', CATEGORIA_SNIPER, SPRITE_municaoSNIPER = Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SNIPER,
    width: 23,
    height: 12,
    posX: 216,
    posY: 239
}));
var img_MUNICAO_SUB = new Image();
img_MUNICAO_SUB.src = './resources/municao_SUB.png';
var municao_SUB = new Municao(90, 'MUNICAO', CATEGORIA_SUB, SPRITE_municaoSUB = Sprites({
    context: CONTEXT,
    image: img_MUNICAO_SUB,
    width: 23,
    height: 12,
    posX: 256,
    posY: 209
}));
//# sourceMappingURL=equipamentos.js.map