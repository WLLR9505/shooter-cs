const at_MIRA = 0;
const at_PENTE = 1;
const at_CANO = 2;
const at_ESPECIAL = 3;

class Attachment {
    constructor (nome, tipo, imgNome, extra) {
        this.tipo = tipo;
        this.nome = nome;
        this.extra = extra;
        if (imgNome != undefined) {
            this.img = new Image();
            this.img.src = './resources/' + imgNome;
        }
    }
}

class Sight {
    constructor (nome, imgNome) {
        this.nome = nome;
        this.img = new Image();
        this.img.src = './resources/armas/attachments/' + imgNome;
    }
}

var miraComum = new Sight('Mira Comum', 'mira_comum.png');
var atc_miraComum = new Attachment('Mira Comum', at_MIRA, undefined, miraComum);
var miraPontoVermelho = new Sight('Ponto Vermelho', 'mira_ponto_vermelho.png');
var atc_miraPontoVermelho = new Attachment('Ponto Vermelho', at_MIRA, undefined, miraPontoVermelho);
var miraTatica = new Sight('Mira Tatica', 'mira_tatica.png');
var atc_miraTatica = new Attachment('Mira Tatica', at_MIRA, undefined, miraTatica);

class Weapon {
    constructor (nome, alcance, velocidadeTiro, nAttachment, imgNome, anatomia = {}) {
        this.nome = nome;
        this.alcance = alcance;
        this.velocidadeTiro = velocidadeTiro;   // 2 ~ 5
        this.attachment = new Array(nAttachment);
        this.attachment[0] = atc_miraComum;
        this.img = new Image();
        this.img.src = './resources/armas/' + imgNome;
        this.anatomia = anatomia;
    }
    ConnectAttachment (attachment) {
        switch (attachment.tipo) {
            case at_MIRA:
                this.attachment[0] = attachment;
                break;
            case at_PENTE:
                this.attachment[1] = attachment;
                break;
            case at_CANO:
                this.attachment[2] = attachment;
                break;
            case at_ESPECIAL:
                this.attachment[3] = attachment;
                break;
        }
    }
}

var pistola = new Weapon('P1', 30, 5.5, 2, 'pistola_1.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 4,9 ],
        pCano: [ 21, 6 ]
    });
var fuzil1 = new Weapon('FZ-1A', 60, 6, 3,'fuzil_1.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 25, 12 ],
        pCano: [ 57, 6 ]
    });
var shotgunCurta = new Weapon('SHT-C', 50, 4.2, 1, 'shotgun_curta.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 4, 11 ],
        pCano: [ 29, 6 ]
    });
var shotgunLonga = new Weapon('SHT-L', 55, 4.7, 1, 'shotgun_longa.png',
    {
        pArma: [ 0,0 ],
        pMao: [ 18 , 12 ],
        pCano: [ 43, 6 ]
    });


fuzil1.ConnectAttachment(atc_miraTatica);
shotgunLonga.ConnectAttachment(atc_miraTatica);

var angulo = 0,
    x = 100,
    y = 150;

var balaPistola = new Image();
balaPistola.src = './resources/armas/bala_pistola.png';

function drawArma (arma, CONTEXT, XY = [ 2 ]) {

    // angulo = rotacao * Math.PI / 180;
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);
    CONTEXT.save(); //para as alterações não afetarem nada até o restore()

    CONTEXT.translate(arma.anatomia.pArma[0], arma.anatomia.pArma[1]);
    CONTEXT.rotate(angulo);

    if (XY[1] >= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0] || XY[1] <= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0]) {
        CONTEXT.scale(1, -1);   //caso a mira esteja a esquerda da arma
    }
    CONTEXT.drawImage(arma.img, -arma.anatomia.pMao[0], -arma.anatomia.pMao[1]);  //o eixo da arma quando girada é o cabo da mesma

    CONTEXT.restore();
    let pMiraX = XY[0] - arma.attachment[0].extra.img.width;
    let pMiraY = XY[1] - arma.attachment[0].extra.img.height;

    //desenha mira da arma
    CONTEXT.drawImage(arma.attachment[0].extra.img, pMiraX, pMiraY);
}

function updateTiro (tirosNoAr, CONTEXT) {
    //atualiza a posição dos tiros que já foram disparados
    if(tirosNoAr.length == 0) {
        return;
    }
    for (var i = 0; i < tirosNoAr.length; i++) {
        tirosNoAr[i].alcance--;
        tirosNoAr[i].x += tirosNoAr[i].dx * tirosNoAr[i].velocidadeTiro;
        tirosNoAr[i].y += tirosNoAr[i].dy * tirosNoAr[i].velocidadeTiro;
        if (tirosNoAr[i].alcance == 0) {
            tirosNoAr.shift();
            console.log('tiro removido ', i);
            continue;
        }
        CONTEXT.save();

        CONTEXT.translate(tirosNoAr[i].x, tirosNoAr[i].y);
        CONTEXT.rotate(tirosNoAr[i].anguloBala);
        CONTEXT.drawImage(balaPistola, -balaPistola.width / 2, -balaPistola.height / 2);
        CONTEXT.restore();
    }
}

function drawTiro (bala, arma, tirosNoAr = [], XY = [ 2 ], CONTEXT) {
    console.log('tiro');
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]) * 180 / Math.PI;
    let anguloBala = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);

    var tiro = {};
    tiro.dx = arma.velocidadeTiro * Math.cos(Math.PI * angulo / 180); //angulo do subida
    tiro.dy = arma.velocidadeTiro * Math.sin(Math.PI * angulo / 180); //angulo do subida
    tiro.x = arma.anatomia.pArma[0] + tiro.dx * 5; //posição de onde parte os tiros
    tiro.y = (arma.anatomia.pArma[1] - arma.anatomia.pCano[1]) + tiro.dy * 5; //posição de onde parte os tiros
    tiro.alcance = arma.alcance;
    tiro.velocidadeTiro = arma.velocidadeTiro;
    tiro.anguloBala = anguloBala;   //angulo em que a bala está rotacionada

    tirosNoAr.push(tiro);   //adiciona uma nova bala no ar

    CONTEXT.save();

    CONTEXT.translate(tiro.x, tiro.y);
    CONTEXT.rotate(anguloBala);
    CONTEXT.drawImage(bala, tiro.x, tiro.y);
    CONTEXT.restore();
}
