import { Sprites, I_sprites } from '../../Engine/sprites.js';
import { DistAB, RandomNumber} from '../../Tools/tools.js'
import { Municao, balaFuzil, balaPistola } from './bullets.js'
import { CONTEXT } from '../../Engine/canvas.js';
import { Mira, Anexo } from './attachments.js';
import { tirosNoAr } from '../../main.js';

// var tirosNoAr = new Array(0);

//***************************************
enum tipo_Anexo {
    MIRA,
    PENTE,
    CANO,
    ESPECIAL
}
var miraComum = new Mira('Mira Comum', 0, 'mira_comum.png');
var atc_miraComum = new Anexo('Mira Comum', tipo_Anexo.MIRA, undefined, miraComum);
//***************************************

//usado para decidir o tipo de bala a ser desenhada no tiro
const BALAS = [
    ['PISTOLA', balaPistola],
    ['SHOTGUN', balaPistola],
    ['SUB', balaPistola],
    ['FUZIL', balaFuzil],
    ['SNIPER', balaFuzil]
];

interface I_anatomia {
    pArma: [2],
    pMao: [2],
    pCano: [2],
    pATCMira: [2],
    pATCBase: [2],
    pATCEspecial: [2]
}

// const CATEGORIA_PISTOLA = 0;
// const CATEGORIA_SHOTGUN = 1;
// const CATEGORIA_SUB = 2;
// const CATEGORIA_FUZIL = 3 ;
// const CATEGORIA_SNIPER = 4 ;

class Arma {
	categoria: any;
    nome: string;
    alcance: any;
    precisao: any;
    velocidadeTiro: any;
    taxaTiros: number[]; //quanto menor mais rapida a sequencia de tiros    [variável/fixo]
    //1~2: metralhadoras pesadas
    // 3~10: fuzis
    // 10~15: pistolas
    // 15~^: shotguns
    attachment: any[];
    pente: [number, number, number]; //atual/total/limite pente
    img: HTMLImageElement;
    anatomia: I_anatomia;
    tipo: any;
    constructor(nome, pente, alcance, precisao, velocidadeTiro, taxaTiros, nAttachment, imgNome, anatomia, categoria, tipo?) {
        this.nome = nome;
        this.pente = pente;
        this.alcance = alcance;
        this.precisao = precisao; // 0 ~ 10 quanto menor, maior a precisao
        this.velocidadeTiro = velocidadeTiro;   // 2 ~ 5
        this.taxaTiros = [taxaTiros,taxaTiros];
        this.attachment = new Array(nAttachment);
        this.attachment[0] = atc_miraComum;
        this.img = new Image();
        this.img.src = './resources/armas/' + imgNome;
        this.anatomia = anatomia;
        this.categoria = categoria;
        this.tipo = tipo || null;   //caso possa ser usada como anexo
    }
    atirar(X : number, Y : number) {
        if (this.pente[0] > 0) {    //se o pente atual tiver balas
            if (this.taxaTiros[0] == 0) {
                drawTiro(BALAS[this.categoria][1], this, tirosNoAr, [X, Y], CONTEXT);
                this.pente[0] -= 1;
                 this.taxaTiros[0] = this.taxaTiros[1];
            } else {
                this.taxaTiros[0]--;
                if (this.taxaTiros[0] < 0) {    //impede que o delay fique negativo caso tenha segunda arma
                    this.taxaTiros[0] = 0;
                }
            }
        } else {
            // this.recarregar(pente)
            console.log('sem municao ::');
            return false;
        }
    }
    recarregar(pente: number) {
        this.pente[0] += pente;
    }
    ConectarAnexo(attachment) {
        switch (attachment.tipo) {
            case tipo_Anexo.MIRA:
                this.attachment[0] = attachment;
                this.alcance += attachment.extra.mod;
                break;
            case tipo_Anexo.PENTE:
                this.attachment[1] = attachment;
                break;
            case tipo_Anexo.CANO:   //anexos acoplados no cano
                if (this.anatomia.pATCBase != undefined) {
                    this.attachment[2] = attachment;
                }
                break;
            case tipo_Anexo.ESPECIAL:
                if (this.anatomia.pATCEspecial != undefined) {
                    this.attachment[3] = attachment;
                    this.attachment[3].anatomia.pArma = this.anatomia.pArma;
                }
                break;
        }
    }
}

var angulo = 0;
let miraMouse;

function drawArma(arma, CONTEXT, XY = [2], mira = true) {
    // angulo = rotacao * Math.PI / 180;
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);
    CONTEXT.save(); //para as alterações não afetarem nada até o restore()

    CONTEXT.translate(arma.anatomia.pArma[0], arma.anatomia.pArma[1]);
    CONTEXT.rotate(angulo);

    if (XY[1] >= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0] || XY[1] <= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0]) {
        CONTEXT.scale(1, -1);   //caso a mira esteja a esquerda da arma
    }
    CONTEXT.drawImage(arma.img, -arma.anatomia.pMao[0], -arma.anatomia.pMao[1]);  //o eixo da arma quando girada é o cabo da mesma
    try {
        CONTEXT.drawImage(arma.attachment[0].extra.atcImg, arma.anatomia.pATCMira[0], -arma.anatomia.pATCMira[1]);
        XY[0] -= arma.attachment[0].extra.img.width;
        XY[1] -= arma.attachment[0].extra.img.height;
        miraMouse = arma.attachment[0];
    } catch (e) {
        miraMouse = atc_miraComum;
    }

    if (arma.attachment[2] != undefined) {
        CONTEXT.drawImage(arma.attachment[2].img, arma.anatomia.pATCBase[0], -arma.anatomia.pATCBase[1]);
    }

    if (arma.attachment[3] != undefined) {
        CONTEXT.drawImage(arma.attachment[3].img, arma.anatomia.pATCEspecial[0], -arma.anatomia.pATCEspecial[1]);
    }

    CONTEXT.restore();
    let pMiraX = XY[0];
    let pMiraY = XY[1];

    //desenha mira da arma
    if (mira == true) {
        CONTEXT.drawImage(miraMouse.extra.img, pMiraX, pMiraY);
    }
}

function updateTiro(tirosNoAr, CONTEXT) {
    //atualiza a posição dos tiros que já foram disparados
    if (tirosNoAr.length == 0) {
        return;
    }
    for (var i = 0; i < tirosNoAr.length; i++) {
        tirosNoAr[i].alcance -= tirosNoAr[i].limite;

        tirosNoAr[i].posX += tirosNoAr[i].dx * tirosNoAr[i].velocidadeTiro;
        tirosNoAr[i].posY += tirosNoAr[i].dy * tirosNoAr[i].velocidadeTiro;

        if (tirosNoAr[i].alcance <= 0) {
            console.log('tiro removido percorreu : ' + DistAB(tirosNoAr[i].origem, [tirosNoAr[i].posX, tirosNoAr[i].posY]));
            tirosNoAr.shift();
            console.log('tiro removido', tirosNoAr.length);
            continue;
        }
        CONTEXT.save();

        CONTEXT.translate(tirosNoAr[i].posX, tirosNoAr[i].posY);
        CONTEXT.rotate(tirosNoAr[i].anguloBala);
        CONTEXT.drawImage(tirosNoAr[i].image, -tirosNoAr[i].width / 2, -tirosNoAr[i].height / 2);
        CONTEXT.restore();
    }
}

function drawTiro(bala, arma, tirosNoAr = [], XY = [2], CONTEXT) {
    console.log('tiro ' + arma.nome);
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]) * 180 / Math.PI;
    angulo += RandomNumber(-arma.precisao, +arma.precisao);
    let anguloBala = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);

    var tiro = Sprites({
        context: CONTEXT,
        image: bala,
        width: 20,
        height: 5
    });


    tiro.dx = arma.velocidadeTiro * Math.cos(Math.PI * angulo / 180); //angulo do subida
    tiro.dy = arma.velocidadeTiro * Math.sin(Math.PI * angulo / 180); //angulo do subida


    tiro.posX = arma.anatomia.pArma[0] + tiro.dx * 15; //posição de onde parte os tiros
    tiro.posY = (arma.anatomia.pArma[1] - arma.anatomia.pCano[1]) + tiro.dy * 15; //posição de onde parte os tiros


    tiro.alcance = arma.alcance;
    tiro.velocidadeTiro = arma.velocidadeTiro;
    tiro.anguloBala = anguloBala;   //angulo em que a bala está rotacionada
    tiro.origem = [arma.anatomia.pArma[0], arma.anatomia.pArma[1]];

    let lXY = [0,0];
    lXY[0] += tiro.dx * tiro.velocidadeTiro;
    lXY[1] += tiro.dy * tiro.velocidadeTiro;
    tiro.limite = DistAB([0, 0], lXY);  //faz com que adistância limite do tiro seja subtraída de forma correta

    tirosNoAr.push(tiro);   //adiciona uma nova bala no ar

    CONTEXT.save();

    CONTEXT.translate(tiro.posX, tiro.posY);
    CONTEXT.rotate(anguloBala);
    CONTEXT.drawImage(bala, tiro.posX, tiro.posY);
    CONTEXT.restore();
}

function statusMunicao(personagem, CONTEXT) {
    if (personagem.corpo.maoD || null) {
        let atual = personagem.corpo.maoD.pente[0];
        let total = personagem.corpo.maoD.pente[1];
        let max = personagem.corpo.maoD.pente[2];
        CONTEXT.fillStyle = '#009cff';
        CONTEXT.strokeStyle = '#000000';
        CONTEXT.lineWidth = 3;
        CONTEXT.font = '20px consolas';
        CONTEXT.textBaseline = 'top';
        CONTEXT.strokeText(atual + '/' + total, 5, 50);
        CONTEXT.fillText(atual + '/' + total, 5, 50);

        if (personagem.corpo.maoD.attachment[3] != null) {
            atual = personagem.corpo.maoD.attachment[3].pente[0];
            total = personagem.corpo.maoD.attachment[3].pente[1];
            max = personagem.corpo.maoD.attachment[3].pente[2];
            CONTEXT.fillStyle = '#000000';
            CONTEXT.font = '15px consolas';
            CONTEXT.textBaseline = 'top';
            CONTEXT.fillText(atual + '/' + total, 5, 70);
        }
    }
}

export { Arma, BALAS, drawArma, updateTiro, drawTiro, statusMunicao, tirosNoAr }
