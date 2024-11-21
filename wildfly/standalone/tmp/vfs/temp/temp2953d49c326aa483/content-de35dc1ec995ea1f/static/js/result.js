

// отрисовка графика
var  canvas = document.getElementById('graph');
var  ctx = canvas.getContext('2d');

// размеры
var  width = canvas.width;
var  height = canvas.height;
var  R = 100;
var  centerX = width / 2;
var  centerY = height / 2;

// параметры
ctx.fillStyle = 'rgba(51, 153, 255, 0.2)';
ctx.font = "12px sans-serif";
ctx.strokeStyle  = "black";
ctx.strokeStyle = "white";

// задание области
ctx.strokeRect(0, 0, width, height)

// отрисовка квадрата
ctx.beginPath();
ctx.rect(centerX, centerY, R, R);
ctx.fill();

// отрисовка сектора круга
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.arc(centerX, centerY, R, 3*Math.PI / 2, 2*Math.PI, false);
ctx.lineTo(centerX, centerY);
ctx.fill();

// отрисовка треугольника
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(centerX - R, centerY);
ctx.lineTo(centerX, centerY + R);
ctx.closePath();
ctx.fill();

ctx.beginPath();
// ось Y
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, height);
// ось X
ctx.moveTo(0, centerY);
ctx.lineTo(width, centerY);
ctx.stroke();

ctx.beginPath();
// верхняя стрелка
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX-7, 10);
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX+7, 10);
// правая стрелка
ctx.moveTo(width, centerY);
ctx.lineTo(width-10, centerY-7);
ctx.moveTo(width, centerY);
ctx.lineTo(width-10, centerY+7);
ctx.stroke();

ctx.beginPath();
// отрицательная ось X
ctx.moveTo(R/2+10, centerY-7);
ctx.lineTo(R/2+10, centerY+7);
ctx.moveTo(R+17, centerY-7);
ctx.lineTo(R+17, centerY+7);

ctx.strokeText("-R/2", centerX - R / 2 - 6, centerY - 12);
ctx.strokeText("-R", centerX - R - 6, centerY - 12);

// положительная ось X
ctx.moveTo(centerX + R/2, centerY-7);
ctx.lineTo(centerX + R/2, centerY+7);
ctx.moveTo(centerX + R, centerY-7);
ctx.lineTo(centerX + R, centerY+7);

ctx.strokeText("R/2", centerX + R / 2 - 6, centerY - 12);
ctx.strokeText("R", centerX + R - 3, centerY - 12);

// отрицательная ось Y
ctx.moveTo(centerX-7, R/2+10);
ctx.lineTo(centerX+7, R/2+10);
ctx.moveTo(centerX-7, R+10);
ctx.lineTo(centerX+7, R+10);

ctx.strokeText("-R/2", centerX + 12, centerY + R / 2 + 3);
ctx.strokeText("-R", centerX + 12, centerY + R + 3);

// положительная ось Y
ctx.moveTo(centerX-7, centerY + R/2);
ctx.lineTo(centerX+7, centerY + R/2);
ctx.moveTo(centerX-7, centerY + R);
ctx.lineTo(centerX+7, centerY + R);
ctx.stroke();

ctx.strokeText("R/2", centerX + 12, centerY - R / 2 + 3);
ctx.strokeText("R", centerX + 12, centerY - R + 3);