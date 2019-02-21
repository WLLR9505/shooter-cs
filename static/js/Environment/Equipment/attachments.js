class Anexo {
    constructor(nome, tipo, imgNome, extra) {
        this.nome = nome;
        this.tipo = tipo;
        this.extra = extra;
        if (imgNome != undefined) {
            this.img = new Image();
            this.img.src = './resources/Equipment/Attachments/' + imgNome;
        }
    }
}
class Mira {
    constructor(nome, mod, imgNome, atcImgNome) {
        this.nome = nome;
        this.mod = mod;
        this.img = new Image();
        this.img.src = './resources/Equipment/Attachments/' + imgNome;
        if (atcImgNome != undefined) {
            this.atcImg = new Image();
            this.atcImg.src = './resources/Equipment/Attachments/' + atcImgNome;
        }
    }
}
export { Mira, Anexo };
//# sourceMappingURL=attachments.js.map