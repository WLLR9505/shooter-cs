import { CONTEXT, } from "../Engine/canvas.js";
import { mouseX, mouseY } from "../Controls/MAK.js";
import { cam } from "../Engine/camera.js";
import { drawFPS } from "./fpsCounter.js"

function drawMousePosition (CONTEXT, mouseX, mouseY) {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.strokeStyle = '#000000';
    CONTEXT.lineWidth = 3;
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.strokeText('x ' + mouseX + '  y ' + mouseY, 5, 20);
    CONTEXT.fillText('x ' + mouseX + '  y ' + mouseY, 5, 20);
}

function inspect (dado) {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.strokeStyle = '#000000';
    CONTEXT.lineWidth = 3;
    CONTEXT.font = '10px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.strokeText('inspecionando:' + dado, 5, 100);
    CONTEXT.fillText('inspecionando:' + dado, 5, 100);
}

function drawCamPosition () {
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.strokeStyle = '#000000';
    CONTEXT.lineWidth = 3;
    CONTEXT.font = '14px consolas';
    CONTEXT.textBaseline = 'top';
    CONTEXT.strokeText('CAMERA :: x ' + cam.x + '  y ' + cam.y, 5, 35);
    CONTEXT.fillText('CAMERA :: x ' + cam.x + '  y ' + cam.y, 5, 35);
}

function drawDistPLayerAim (dist, x, y) {
    CONTEXT.strokeStyle = '#000000';
    CONTEXT.fillStyle = '#ffffff';
    CONTEXT.font = '14px consolas';
    CONTEXT.lineWidth = 3;
    CONTEXT.textBaseline = 'top';
    CONTEXT.strokeText(Math.round(dist), x, y);
    CONTEXT.fillText(Math.round(dist), x, y);
}

function drawArea(x, y, w, h) {
    CONTEXT.fillStyle = '#FF0000';
    CONTEXT.strokeStyle = '#FF0000';
    CONTEXT.fillRect(x, y, w, h);
}

function circleArea(centerX, centerY, radius) {
    CONTEXT.beginPath();
    CONTEXT.arc(centerX, centerY, radius + 10, 0, 2* Math.PI);
    CONTEXT.stroke();
}

function devInfo () {
    drawFPS(CONTEXT);
    drawMousePosition(CONTEXT, mouseX, mouseY);
    drawCamPosition();
}

export { devInfo, inspect, drawArea, circleArea, drawDistPLayerAim }
