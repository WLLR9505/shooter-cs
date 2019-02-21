class Anexo {
    nome: string;
    tipo: any;
    extra: any;
    img: HTMLImageElement;
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
    nome: string;
    mod: Number; //modificador de alcance
    img: HTMLImageElement;
    atcImg: HTMLImageElement;
    constructor(nome, mod, imgNome, atcImgNome?) {
        //último parámetro caso a mira possa ser equipada na arma
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

export { Mira, Anexo }
