var corpoNULL = {
    maoD: null,
    maoE: null,
    torax: null,
    costas: null,
    cabeca: null
};
var cerebroNULL = {
    seguir: null,
    matar: null,
    Mirar: {
        mirar: false,
        alvo: { x: 0,
            y: 0 }
    }
};
;
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
    guardar(obj) {
        try {
            this.corpo.costas.guardar(obj);
            return true;
        }
        catch (_a) {
            console.log('BOT :: não tem inventário');
        }
    }
    recarregarArma(arma = this.corpo.maoD) {
        let pente = 0;
        if (arma.pente[0] == arma.pente[2]) {
            return true;
        }
        if (this.corpo.costas == null) {
            return false;
        }
        for (let i = 0; i < this.corpo.costas.slot.length; i++) {
            if (this.corpo.costas.slot[i].compatibilidade == arma.categoria) {
                pente = arma.pente[2] - arma.pente[0];
                if (pente > this.corpo.costas.slot[i].qtde) {
                    pente = this.corpo.costas.slot[i].qtde;
                    this.corpo.costas.slot[i].qtde = 0;
                }
                else {
                    this.corpo.costas.slot[i].qtde -= pente;
                }
                arma.pente[1] = this.corpo.costas.slot[i].qtde;
                arma.recarregar(pente);
                return true;
            }
        }
    }
    equipar(arma) {
        if (this.corpo.maoD == null) {
            this.corpo.maoD = arma;
            this.corpo.maoD.anatomia.pArma[0] = this.sprites.posX + 30;
            this.corpo.maoD.anatomia.pArma[1] = this.sprites.posY + 60;
            this.postura -= 5;
        }
    }
    usar(obj) {
        if (USAVEIS.includes(obj.tipo)) {
            switch (obj.tipo) {
                case 'MOCHILA':
                    this.corpo.costas = obj;
                    return true;
                case 'MUNICAO':
                    if (this.guardar(obj)) {
                        return true;
                    }
            }
        }
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
                bot.corpo.maoD.anatomia.pArma[0] = bot.sprites.posX + 30;
                bot.corpo.maoD.anatomia.pArma[1] = bot.sprites.posY + 60;
                drawArma(bot.corpo.maoD, CONTEXT, [alvo[0], alvo[1]], true);
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
            let distAlvo = DistAB([bot.sprites.posX, bot.sprites.posY], [player.sprites.posX, player.sprites.posY]);
            if (distAlvo < 500) {
                bot.cerebro.Mirar.mirar = true;
                bot.cerebro.seguir = true;
                try {
                    if (distAlvo < bot.corpo.maoD.alcance) {
                        bot.cerebro.matar = true;
                        bot.cerebro.seguir = false;
                    }
                }
                catch (_a) {
                    console.log(`${bot.nome} :: Não posso atirar!`);
                }
            }
            else {
                bot.cerebro.Mirar.mirar = false;
                bot.cerebro.matar = false;
                bot.cerebro.seguir = false;
            }
            if (bot.cerebro.seguir) {
                console.log(`${bot.nome} :: Engajado no inimigo!`);
                bot.IA_seguir(player);
            }
            if (bot.cerebro.Mirar.mirar) {
                console.log(`${bot.nome} :: Alvo na mira`);
                bot.IA_mirar(player);
            }
            if (bot.cerebro.matar) {
                bot.IA_matar();
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
    IA_mirar(player) {
        this.cerebro.Mirar.alvo.x = player.sprites.posX;
        this.cerebro.Mirar.alvo.y = player.sprites.posY + 30;
    }
    IA_matar() {
        if (this.corpo.maoD.atirar(this.cerebro.Mirar.alvo.x, this.cerebro.Mirar.alvo.y) == false) {
            this.recarregarArma();
        }
    }
}
//# sourceMappingURL=bots.js.map