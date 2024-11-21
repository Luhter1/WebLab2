// состояние точек
const state = {
    x: 0,
    y: 0,
    r: 1.0,
};


let start;
const table = document.getElementById("result-table");
const error = document.getElementById("error");
const form = document.getElementById("data");


// возможные значения параметров 
const valsX = [-3, 5];
const valsY = [-3, 5];
const valsR = [1, 5];


function roundTo(num, places) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
}


// проверка полученных параметров
const validate = (state) => {
    if(isNaN(Number(state.y)) || state.y < valsY[0] || state.y > valsY[1]){
        error.hidden = false;
        error.innerText = `y должен быть в диапазоне [${[...valsY].join(", ")}]`;
        return false;
    }

    if(isNaN(Number(state.x)) || state.x < valsX[0] || state.x > valsX[1]){
        error.hidden = false;
        error.innerText = `x должен быть в диапазоне [${[...valsX].join(", ")}]`;
        return false;
    }

    if(isNaN(Number(state.r)) || state.r < valsR[0] || state.r > valsR[1]){
        error.hidden = false;
        error.innerText = `r должен быть в диапазоне [${[...valsR].join(", ")}]`;
        return false;
    }

    error.hidden = true;
    return true
}



// получение и отправка данных на сервер
form.addEventListener("submit", async function(e){
    e.preventDefault();
    state.y = document.getElementById("y").value;
    state.x = document.querySelector('input[name="x"]:checked').value;
    state.r = document.getElementById("r").value;

    if(validate(state)){

        var form = document.getElementById("data");
        form.submit();
    }
});


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


canvas.addEventListener("click", function(e){
    state.r = document.getElementById("r").value;

    if (state.r == null) {
        alert("Невозможно вычислить попадание");
        return;
    }

    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    state.x = (x - centerX)/R
    state.y = -(y - centerY)/R


    if(validate(state)){
        localStorage.setItem('data', JSON.stringify({ x: x, y: y }));

        var form = document.getElementById("data");

        var input1 = document.createElement("input");
        input1.type = "radio";
        input1.name = "x";
        input1.value = roundTo(state.x, 2);
        input1.checked = true;
        input1.hidden=true
        form.appendChild(input1);

        var input2 = document.getElementById("y");
        input2.value = state.y;

        var input3 = document.createElement("input");
        input3.type = "number";
        input3.name = "p";
        input3.value = 1;
        input3.hidden=true
        form.appendChild(input3);

        form.submit();
    }

});