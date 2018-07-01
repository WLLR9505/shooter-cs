class Personagem {
    constructor (nome, velocidade, energia, vida = [ 2 ], imgNome, spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.img = new Image();
        this.img.src = './resources/char/' + imgNome;
        this.sprites = Sprites(spriteParams);
    }
    spawn (x, y) {
        this.sprites.render(x, y, 0);
    }
    andar (x, y) {
        this.sprites.quadroInicial = 3;
        this.sprites.quadroFinal = 4;
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(x, y)
    }
    update () {
        this.sprites.update();
    }
}

const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/char_militar1_sheet.png';
