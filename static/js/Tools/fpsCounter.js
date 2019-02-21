function contadorFPS() {
    this.lastFrameCount = 0;
    var dateTemp = new Date();
    this.frameLast = dateTemp.getTime();
    dateTemp = undefined;
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
    dateTemp = undefined;
};
var contaFPS = new contadorFPS();
function drawFPS(CONTEXT) {
    contaFPS.contarFrames();
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.strokeStyle = "#000000";
    CONTEXT.lineWidth = 3;
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.strokeText(contaFPS.lastFrameCount + 'FPS', 5, 5);
    CONTEXT.fillText(contaFPS.lastFrameCount + 'FPS', 5, 5);
}
export { drawFPS };
//# sourceMappingURL=fpsCounter.js.map