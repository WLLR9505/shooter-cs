import { I_sprites } from '../../Engine/sprites.js'

class Mochila {
	nEspacos: number;
	slot: any[];
	img: HTMLImageElement;
	tipo: string;
	sprite: I_sprites;
	constructor (nEspacos, imgSRC) {
		this.slot = new Array();
		this.img = new Image;
		this.img.src = imgSRC;
		this.tipo = 'MOCHILA';
		this.sprite = null;
		this.nEspacos = nEspacos;
	}
	guardar (obj) {
		if (this.slot.length < this.nEspacos) {	//se tiver espaço
			this.slot.unshift(obj);
			this.nEspacos--;
		} else {
			console.log('mochila cheia');
		}
	}
}

export { Mochila }
