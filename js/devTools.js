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
