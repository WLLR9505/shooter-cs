var angulo = 0,
    rotacao = 0,
    x = 300,
    y = 150;
var armaTeste = new Image();
armaTeste.src = './resources/armas/pistola_1.png';

function drawArma (CONTEXT) {

    // angulo = rotacao * Math.PI / 180;
    angulo = Math.atan2(mouseY - y, mouseX - x);
    CONTEXT.save(); //para as alterações não afetarem nada até o restore()

    CONTEXT.translate(x, y);
    CONTEXT.rotate(angulo);

    if (mouseY >= y && mouseX <= x || mouseY <= y && mouseX <= x) {
        CONTEXT.scale(1, -1);   //caso o mouse esteja a esquerda da arma
    }
    CONTEXT.drawImage(armaTeste, -armaTeste.width / 2, -armaTeste.height / 2);

    CONTEXT.restore();
}
