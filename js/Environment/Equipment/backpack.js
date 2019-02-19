class Mochila {
    constructor(nEspacos, imgSRC) {
        this.slot = new Array();
        this.img = new Image;
        this.img.src = imgSRC;
        this.tipo = 'MOCHILA';
        this.sprite = null;
        this.nEspacos = nEspacos;
    }
    guardar(obj) {
        if (this.slot.length < this.nEspacos) {
            this.slot.unshift(obj);
            this.nEspacos--;
        }
        else {
            console.log('mochila cheia');
        }
    }
}
export { Mochila };
//# sourceMappingURL=backpack.js.map