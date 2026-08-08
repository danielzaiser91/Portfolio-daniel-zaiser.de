var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.strokeStyle = '#3c415c';
ctx.lineWidth = 3;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';
var hue = 0;
var drawing = false;
function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = '#b4a5a5';
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (var i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
var radius = 70;
var inset = 0.5;
var n = 5;
drawShape(120, 120, radius, inset, n);
var angle = 0;

function draw(x, y) {
    if (drawing) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        hue += 3;
        angle += 0.1;
        drawShape(0, 0, radius, inset, n);
        ctx.restore();
    }
}

window.addEventListener('mousemove', (e) => draw(e.x, e.y));
window.addEventListener('touchmove', (e) => draw(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
window.addEventListener('mousedown', function () { return drawing = true; });
window.addEventListener('touchstart', function () { return drawing = true; });
window.addEventListener('mouseup', function () { return drawing = false; });
window.addEventListener('touchend', function () { return drawing = false; });
