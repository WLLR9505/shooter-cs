const THECANVAS = document.getElementById('canvas');
const CONTEXT = THECANVAS.getContext('2d');

window.addEventListener('load', function () {
    canvasApp();
});

function canvasApp () {
    drawScreen()
}

function drawScreen () {
    CONTEXT.fillStyle = '#0099FF';
    CONTEXT.fillRect(0, 0, 600, 300);
}
