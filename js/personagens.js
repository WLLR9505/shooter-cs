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
        this.sprites.render(x, y);
    }
    andar (x, y, direcao) {
        if (direcao == 'c') {
            this.sprites.quadroInicial = 12;
            this.sprites.quadroFinal = 13;
        }
        if (direcao == 'b') {
            this.sprites.quadroInicial = 9;
            this.sprites.quadroFinal = 10;
        }
        if (direcao == 'e') {
            this.sprites.quadroInicial = 1;
            this.sprites.quadroFinal = 2;
        }
        if (direcao == 'd') {
            this.sprites.quadroInicial = 6;
            this.sprites.quadroFinal = 7;
        }

        if (this.sprites.quadro < (this.sprites.quadroInicial)) {   //se o quadro atual for muito diferente do quadro inicial, já que se for 0 ele passará por todos os quadros até o inicial
            this.sprites.quadro = this.sprites.quadroInicial - 1;
        }
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(x, y);
    }
    update () {
        this.sprites.update();
    }
}

const MILITAR_SHEET = new Image();
MILITAR_SHEET.src = './resources/char/char_militar1_sheet.png';
