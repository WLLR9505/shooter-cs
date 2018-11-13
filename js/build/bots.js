var corpoNULL = {
    maoD: null,
    maoE: null,
    torax: null,
    costas: null,
    cabeca: null
};
var cerebroNULL = {
    seguir: null
};
;
;
class Bot {
    constructor(nome, velocidade, energia, vida = [2], spriteParams) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.energia = energia;
        this.vida = vida;
        this.corpo = Object.assign({}, corpoNULL);
        this.sprites = Sprites(spriteParams);
        this.postura = 5;
        this.cerebro = Object.assign({}, cerebroNULL);
    }
    spawn(x, y) {
        this.sprites.render(x, y);
    }
    andar(direcao, olhos = [2], v) {
        if (direcao == 'c') {
            this.postura = postura(this, ANDADADO_D_COSTAS);
            if (olhos[1] > this.sprites.posY) {
                this.postura = postura(this, ANDANDO_D_FRENTE);
            }
            this.sprites.posY -= v;
        }
        if (direcao == 'b') {
            this.postura = postura(this, ANDANDO_D_FRENTE);
            if (olhos[1] < this.sprites.posY) {
                this.postura = postura(this, ANDADADO_D_COSTAS);
            }
            this.sprites.posY += v;
        }
        if (direcao == 'e') {
            this.postura = postura(this, ANDANDO_D_ESQUERDA);
            if (olhos[0] > this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            this.sprites.posX -= v;
        }
        if (direcao == 'd') {
            this.postura = postura(this, ANDANDO_D_DIREITA);
            if (olhos[0] < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
            this.sprites.posX += v;
        }
        this.sprites.quadroInicial = 1;
        this.sprites.quadroFinal = 2;
        this.sprites.update(this.sprites.quadroInicial, this.sprites.quadroFinal);
        this.sprites.render(this.sprites.posX, this.sprites.posY);
    }
    update(alvo, player) {
        IA(player, this);
        if (this.vida[0] < 1) {
            console.log(`bot ${this.nome} morreu`);
            return false;
        }
        if (alvo[1] < this.sprites.posY) {
            this.postura = postura(this, ANDADADO_D_COSTAS);
        }
        else {
            if (alvo[0] > this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_DIREITA);
            }
            if (alvo[0] < this.sprites.posX) {
                this.postura = postura(this, ANDANDO_D_ESQUERDA);
            }
        }
        function renderArma(bot) {
            if (bot.corpo.maoD != null) {
                bot.corpo.maoD.anatomia.pArma[0] = bot.sprites.posX + 20;
                bot.corpo.maoD.anatomia.pArma[1] = bot.sprites.posY + 45;
                drawArma(bot.corpo.maoD, CONTEXT, [alvo[0], alvo[1]]);
                return bot;
            }
        }
        function renderPersonagem(bot) {
            bot.sprites.update();
            bot.sprites.render(bot.sprites.posX, bot.sprites.posY, bot.postura);
        }
        if (this.postura == 2 || this.postura == 7) {
            renderArma(this);
            renderPersonagem(this);
        }
        else {
            renderPersonagem(this);
            renderArma(this);
        }
        function IA(player, bot) {
            if (bot.cerebro.seguir) {
                bot.IA_seguir(player);
            }
        }
        return true;
    }
    IA_seguir(alvo) {
        if (this.sprites.posX - 50 >= alvo.sprites.posX) {
            this.andar('e', [mouseX, mouseY], 3);
        }
        else {
            this.postura = postura(this, PARADO_D);
        }
        if (this.sprites.posX + 50 <= alvo.sprites.posX) {
            this.andar('d', [mouseX, mouseY], 3);
        }
        else {
            this.postura = postura(this, PARADO_D);
        }
        if (this.sprites.posY - 50 >= alvo.sprites.posY) {
            this.andar('c', [mouseX, mouseY], 3);
        }
        else {
            this.postura = postura(this, PARADO_D);
        }
        if (this.sprites.posY + 50 <= alvo.sprites.posY) {
            this.andar('b', [mouseX, mouseY], 3);
        }
        else {
            this.postura = postura(this, PARADO_D);
        }
    }
}
//# sourceMappingURL=bots.js.map