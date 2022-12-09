// let canvasBoxes = [];
// let gridContainer = document.getElementById("grid-container");
// let gridSize = 10;
// let colorInput = document.getElementById("favcolor");
// let currentColor = "black";

// gridContainer.style.gridTemplate = `repeat(${gridSize}, 1fr)/repeat(${gridSize}, 1fr)`

// for(let i = 0; i < gridSize ** 2; i++){
//     canvasBoxes[i] = document.createElement("div");
//     canvasBoxes[i].classList.add('box');
//     canvasBoxes[i].boxIndex = i;
//     // canvasBoxes[i].textContent = canvasBoxes[i].boxIndex;
// }

// for(let i = 0; i < canvasBoxes.length; i++){
//     gridContainer.append(canvasBoxes[i]);
// }

// canvasBoxes = document.querySelectorAll('.box');


// colorInput.addEventListener('input', () => {currentColor = colorInput.value;})
// console.log(canvasBoxes[1].boxIndex);

let canvasBoxes = [];
let canvasContainer = document.getElementById("canvas-container");
let canvasSlider = document.getElementById("canvas-slider");
let canvasSliderText = document.getElementById("canvas-slider-text");
let colorPicker = document.getElementById("color-picker");
let clearButton = document.getElementById("clear-button");

let gridSize = 30;
let currentColor = "#000000";

function changeGridSize(value){
    gridSize = value;
    canvasContainer.style.gridTemplate = `repeat(${gridSize}, 1fr)/repeat(${gridSize}, 1fr)`
}

function drawNewGrid(){
    for(let i = 0; i < gridSize ** 2; i++){
    canvasBoxes[i] = document.createElement("div");
    canvasBoxes[i].classList.add('box');
    canvasBoxes[i].boxIndex = i;
    canvasContainer.append(canvasBoxes[i]);
    }
    for(let i = 0; i < canvasBoxes.length; i++){
    canvasBoxes[i].addEventListener('mouseenter', function(e) {
        if(e.buttons == 1){
            canvasBoxes[i].style.backgroundColor = currentColor;
        }
     }
     );
     canvasBoxes[i].addEventListener('mousemove', function(e) {
             if(e.buttons == 1){
            canvasBoxes[i].style.backgroundColor = currentColor;
        }
     }
     );
     canvasBoxes[i].addEventListener('click', function()
     {
        canvasBoxes[i].style.backgroundColor = currentColor;
     }
     );
    }
}
function resetCanvasContainer(){
    canvasContainer.innerHTML = "";
    canvasBoxes = [];
}
function clearCanvas(){
    for (let i = 0; i < canvasBoxes.length; i++) {
         canvasBoxes[i].style.backgroundColor = "";
    }
}

changeGridSize(30);
drawNewGrid();
clearButton.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', () => {currentColor = colorPicker.value;});
canvasSlider.addEventListener('input', () => {
    canvasSliderText.textContent = `${canvasSlider.value} x ${canvasSlider.value}`;
    changeGridSize(canvasSlider.value);
    resetCanvasContainer();
    drawNewGrid();
    });
// init
