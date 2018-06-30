var angulo = 0,
    rotacao = 0,
    x = 300,
    y = 150;
var armaTeste = new Image();
armaTeste.src = './resources/armas/pistola_1.png';

function drawArma (CONTEXT) {

    angulo = rotacao * Math.PI / 180;
    CONTEXT.save(); //para as alterações não afetarem nada até o restore()

    CONTEXT.translate(x, y);
    CONTEXT.rotate(angulo);

    CONTEXT.drawImage(armaTeste, -armaTeste.width / 2, -armaTeste.height / 2);

    CONTEXT.restore();
    rotacao += 10;
}
