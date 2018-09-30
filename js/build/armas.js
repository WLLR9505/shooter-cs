var delay = 0;
var tipo_Anexo;
(function (tipo_Anexo) {
    tipo_Anexo[tipo_Anexo["MIRA"] = 0] = "MIRA";
    tipo_Anexo[tipo_Anexo["PENTE"] = 1] = "PENTE";
    tipo_Anexo[tipo_Anexo["CANO"] = 2] = "CANO";
    tipo_Anexo[tipo_Anexo["ESPECIAL"] = 3] = "ESPECIAL";
})(tipo_Anexo || (tipo_Anexo = {}));
const CATEGORIA_PISTOLA = 0;
const CATEGORIA_SHOTGUN = 1;
const CATEGORIA_SUB = 2;
const CATEGORIA_FUZIL = 3;
const CATEGORIA_SNIPER = 4;
var balaPistola = new Image();
balaPistola.src = './resources/armas/bala_pistola.png';
var balaFuzil = new Image();
balaFuzil.src = './resources/armas/bala_fuzil.png';
const BALAS = [
    ['PISTOLA', balaPistola],
    ['SHOTGUN', balaPistola],
    ['SUB', balaPistola],
    ['FUZIL', balaFuzil],
    ['SNIPER', balaFuzil]
];
class Municao {
    constructor(qtde, tipo, compatibilidade, sprite) {
        this.qtde = qtde;
        this.tipo = tipo;
        this.compatibilidade = compatibilidade;
        this.sprite = sprite;
    }
}
class Anexo {
    constructor(nome, tipo, imgNome, extra) {
        this.nome = nome;
        this.tipo = tipo;
        this.extra = extra;
        if (imgNome != undefined) {
            this.img = new Image();
            this.img.src = './resources/armas/attachments/' + imgNome;
        }
    }
}
class Mira {
    constructor(nome, imgNome, atcImgNome) {
        this.nome = nome;
        this.img = new Image();
        this.img.src = './resources/armas/attachments/' + imgNome;
        if (atcImgNome != undefined) {
            this.atcImg = new Image();
            this.atcImg.src = './resources/armas/attachments/' + atcImgNome;
        }
    }
}
class Weapon {
    constructor(nome, pente, alcance, precisao, velocidadeTiro, taxaTiros, nAttachment, imgNome, anatomia = {}, categoria, tipo) {
        this.nome = nome;
        this.pente = pente;
        this.alcance = alcance;
        this.precisao = precisao;
        this.velocidadeTiro = velocidadeTiro;
        this.taxaTiros = taxaTiros;
        this.attachment = new Array(nAttachment);
        this.attachment[0] = atc_miraComum;
        this.img = new Image();
        this.img.src = './resources/armas/' + imgNome;
        this.anatomia = anatomia;
        this.categoria = categoria;
        this.tipo = tipo || null;
    }
    atirar() {
        if (this.pente[0] > 0) {
            if (delay == 0) {
                drawTiro(BALAS[this.categoria][1], this, tirosNoAr, [mouseX, mouseY], CONTEXT);
                this.pente[0] -= 1;
                delay = this.taxaTiros;
            }
            else {
                delay--;
                if (delay < 0) {
                    delay = 0;
                }
            }
        }
        else {
            console.log('sem municao ::');
            return false;
        }
    }
    recarregar(pente) {
        this.pente[0] += pente;
    }
    ConectarAnexo(attachment) {
        switch (attachment.tipo) {
            case tipo_Anexo.MIRA:
                this.attachment[0] = attachment;
                break;
            case tipo_Anexo.PENTE:
                this.attachment[1] = attachment;
                break;
            case tipo_Anexo.CANO:
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
var angulo = 0, x = 100, y = 150;
function drawArma(arma, CONTEXT, XY = [2]) {
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);
    CONTEXT.save();
    CONTEXT.translate(arma.anatomia.pArma[0], arma.anatomia.pArma[1]);
    CONTEXT.rotate(angulo);
    if (XY[1] >= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0] || XY[1] <= arma.anatomia.pArma[1] && XY[0] <= arma.anatomia.pArma[0]) {
        CONTEXT.scale(1, -1);
    }
    CONTEXT.drawImage(arma.img, -arma.anatomia.pMao[0], -arma.anatomia.pMao[1]);
    if (arma.attachment[0].extra.atcImg != undefined) {
        CONTEXT.drawImage(arma.attachment[0].extra.atcImg, arma.anatomia.pATCMira[0], -arma.anatomia.pATCMira[1]);
    }
    if (arma.attachment[2] != undefined) {
        CONTEXT.drawImage(arma.attachment[2].img, arma.anatomia.pATCBase[0], -arma.anatomia.pATCBase[1]);
    }
    if (arma.attachment[3] != undefined) {
        CONTEXT.drawImage(arma.attachment[3].img, arma.anatomia.pATCEspecial[0], -arma.anatomia.pATCEspecial[1]);
    }
    CONTEXT.restore();
    let pMiraX = XY[0] - arma.attachment[0].extra.img.width;
    let pMiraY = XY[1] - arma.attachment[0].extra.img.height;
    CONTEXT.drawImage(arma.attachment[0].extra.img, pMiraX, pMiraY);
}
function updateTiro(tirosNoAr, CONTEXT) {
    if (tirosNoAr.length == 0) {
        return;
    }
    for (var i = 0; i < tirosNoAr.length; i++) {
        tirosNoAr[i].alcance--;
        tirosNoAr[i].posX += tirosNoAr[i].dx * tirosNoAr[i].velocidadeTiro;
        tirosNoAr[i].posY += tirosNoAr[i].dy * tirosNoAr[i].velocidadeTiro;
        if (tirosNoAr[i].alcance == 0) {
            tirosNoAr.shift();
            console.log('tiro removido', tirosNoAr.length);
            continue;
        }
        CONTEXT.save();
        CONTEXT.translate(tirosNoAr[i].posX, tirosNoAr[i].posY);
        CONTEXT.rotate(tirosNoAr[i].anguloBala);
        CONTEXT.drawImage(tirosNoAr[i].image, -tirosNoAr[i].width / 2, -tirosNoAr[i].height / 2);
        CONTEXT.restore();
        for (let i2 = 0; i2 < objColisao.length; i2++) {
            if (block(tirosNoAr[i], objColisao[i2])) {
                tirosNoAr.shift();
                console.log('tiro removido por colisao');
                if (tirosNoAr.length == 0) {
                    break;
                }
            }
        }
    }
}
function drawTiro(bala, arma, tirosNoAr = [], XY = [2], CONTEXT) {
    console.log('tiro');
    angulo = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]) * 180 / Math.PI;
    angulo += RandomNumber(-arma.precisao, +arma.precisao);
    let anguloBala = Math.atan2(XY[1] - arma.anatomia.pArma[1], XY[0] - arma.anatomia.pArma[0]);
    var tiro = Sprites({
        context: CONTEXT,
        image: bala,
        width: 20,
        height: 9
    });
    tiro.dx = arma.velocidadeTiro * Math.cos(Math.PI * angulo / 180);
    tiro.dy = arma.velocidadeTiro * Math.sin(Math.PI * angulo / 180);
    tiro.posX = arma.anatomia.pArma[0] + tiro.dx * 5;
    tiro.posY = (arma.anatomia.pArma[1] - arma.anatomia.pCano[1]) + tiro.dy * 5;
    tiro.alcance = arma.alcance;
    tiro.velocidadeTiro = arma.velocidadeTiro;
    tiro.anguloBala = anguloBala;
    tirosNoAr.push(tiro);
    CONTEXT.save();
    CONTEXT.translate(tiro.posX, tiro.posY);
    CONTEXT.rotate(anguloBala);
    CONTEXT.drawImage(bala, tiro.posX, tiro.posY);
    CONTEXT.restore();
}
function statusMunicao(personagem, THECANVAS, CONTEXT) {
    if (personagem.corpo.maoD || null) {
        let atual = personagem.corpo.maoD.pente[0];
        let total = personagem.corpo.maoD.pente[1];
        let max = personagem.corpo.maoD.pente[2];
        CONTEXT.fillStyle = '#000000';
        CONTEXT.font = '20px consolas';
        CONTEXT.textBaseline = 'top';
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
//# sourceMappingURL=armas.js.map