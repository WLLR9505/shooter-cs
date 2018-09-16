// --------------- ARMAS

var pistola = new Weapon('P1', 30, 2, 5.5, 2, 'pistola_1.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 4,9 ],
        pCano: [ 21, 6 ],
        pATCMira: [ 0, 12 ]
    });
var fuzil1 = new Weapon('FZ-1A', 60, 4, 6, 3,'fuzil_1.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 25, 12 ],
        pCano: [ 57, 6 ],
        pATCMira: [ 0, 15 ],
        pATCBase: [ 20, 2 ]
    });
var shotgunCurta = new Weapon('SHT-C', 50, 7,4.2, 1, 'shotgun_curta.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 4, 11 ],
        pCano: [ 29, 6 ],
        pATCMira: [ 0, 15 ]
    });
var shotgunLonga = new Weapon('SHT-L', 55, 6, 4.7, 2, 'shotgun_longa.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 18 , 12 ],
        pCano: [ 43, 6 ],
        pATCMira: [ 0, 15 ],
        pATCBase: [ 15, 2 ]
    });

var FMA = new Weapon('FM-A', 70, 2, 5, 3,'fm-a.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 30, 12 ],
        pCano: [ 55, 6 ],
        pATCMira: [ 10, 15 ],
        pATCBase: [ 15, 2 ],
        pATCEspecial: [ 5, 2 ]
    });

var SMMA = new Weapon('SMM-A', 40, 3, 5.5, 2,'smm-a.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 30, 12 ],
        pCano: [ 50, 6 ],
        pATCMira: [ -5, 15 ]
    }, tipo_Anexo.ESPECIAL);


// --------------- MIRAS

var miraComum = new Mira('Mira Comum', 'mira_comum.png');
var atc_miraComum = new Anexo('Mira Comum', tipo_Anexo.MIRA, undefined, miraComum);

var miraPontoVermelho = new Mira('Ponto Vermelho', 'mira_ponto_vermelho.png', 'atc_ponto_vermelho.png');
var atc_miraPontoVermelho = new Anexo('Ponto Vermelho', tipo_Anexo.MIRA, undefined, miraPontoVermelho);

var miraTatica = new Mira('Mira Tatica', 'mira_tatica.png', 'atc_tatica.png');
var atc_miraTatica = new Anexo('Mira Tatica', tipo_Anexo.MIRA, undefined, miraTatica);

var mira2 = new Mira('Luneta 2x', 'mira_tatica.png', 'atc_luneta_2x.png');
var atc_luneta2 = new Anexo('Luneta 2x', tipo_Anexo.MIRA, undefined, mira2);

var mira4 = new Mira('Luneta 4x', 'mira_tatica.png', 'atc_luneta_4x.png');
var atc_luneta4 = new Anexo('Luneta 4x', tipo_Anexo.MIRA, undefined, mira4);

var mira8 = new Mira('Luneta 8x', 'mira_tatica.png', 'atc_luneta_8x.png');
var atc_luneta8 = new Anexo('Luneta 8x', tipo_Anexo.MIRA, undefined, mira8);

// --------------- ANEXOS

var atc_apoio = new Anexo('Apoio Tatico', tipo_Anexo.CANO, 'apoio_tatico.png', undefined);

// --------------- BALAS
