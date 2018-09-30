//funções úteis
function contadorFPS () {
    this.lastFrameCount = 0;
    var dateTemp = new Date();
    this.frameLast = dateTemp.getTime();
    delete dataTemp;
    this.frameCtr = 0;
}

contadorFPS.prototype.contarFrames = function () {
    var dateTemp = new Date();
    this.frameCtr++;

    if (dateTemp.getTime() >= this.frameLast + 1000) {
        this.lastFrameCount = this.frameCtr;
        this.frameLast = dateTemp.getTime();
        this.frameCtr = 0;
    }
    delete dateTemp;
};

contadorFPS = new contadorFPS();

function drawFPS (THECANVAS, CONTEXT) {
    contadorFPS.contarFrames();
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.fillText(contadorFPS.lastFrameCount + 'FPS', 5, 5);
}

function drawMousePosition (CONTEXT, mouseX, mouseY) {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.fillText('x ' + mouseX + '  y ' + mouseY, 5, 20);
}

function inspect (dado) {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.font = '10px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.fillText('inspecionando:' + dado, 5, 100);
}

function drawCamPosition () {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.fillText('CAMERA :: x ' + cam.x + '  y ' + cam.y, 5, 35);
}

function devInfo (THECANVAS, CONTEXT, mouseX, mouseY) {
    drawFPS(THECANVAS, CONTEXT);
    drawMousePosition(CONTEXT, mouseX, mouseY);
    drawCamPosition(CONTEXT);
}
