//// VARIABLES
let canvasMap;
let canvasContainer = document.getElementById("canvas-container");
let canvasSlider = document.getElementById("canvas-slider");
let canvasSliderText = document.getElementById("canvas-slider-text");
let primaryButton = document.getElementById("color-picker");
let secondaryButton = document.getElementById("color-picker-sec");
let eraserButton = document.getElementById("eraser-button");
let clearButton = document.getElementById("clear-button");
let gridButton = document.getElementById("grid-button");
var element = document.getElementById("canvas-container");
let saveButton = document.getElementById("save-button");

let gridSize = 30;
let primaryColor;
let secondaryColor;

let bgColor = ""
let bgInput = document.getElementById("color-background");

var getCanvas;
let fillSelected = false;
let eraserSelected = false;

//// FUNCTIONS

function changeGridSize(value){
    gridSize = value;
    canvasContainer.style.gridTemplate = `repeat(${gridSize}, 1fr)/repeat(${gridSize}, 1fr)`
}


function generateMatrix(rows, cols)
{
    canvasMap = [];
    for(let i = 0; i < rows; i++)
    {
        let array = new Array(cols);

        for(let col = 0; col < cols; col++)
        {
            array[col] = document.createElement("div");
            setUpStyle(array[col]);
            setUpEvents(array[col]);
            setUpProperties(array[col]);
        }
        canvasMap.push(array);
    }
}

function setUpStyle(object){
    object.classList.add('box');
    canvasContainer.append(object);
}

function setUpProperties(object){
    object.color = bgColor;
    object.filled = false;
}

// adds events on every cell of the grid
function setUpEvents(object){
        object.addEventListener('mousemove', function(e) {
            if(fillSelected) return;
            if(eraserSelected && (e.buttons == 1 || e.buttons == 2)){
                object.style.backgroundColor = bgColor;
                object.color = bgColor;
                object.filled = false;
                return;
            }
            if(e.buttons == 1){
                object.color = primaryColor;
                object.style.backgroundColor = primaryColor;
                object.filled = true;
            }else if(e.buttons == 2){
                object.color = secondaryColor;
                object.style.backgroundColor = secondaryColor;
                object.filled = true;
            }
        }
        );
        //
        object.addEventListener('click', function(e){
            if(eraserSelected){
                object.style.backgroundColor = bgColor;
                object.color = bgColor;
                object.filled = false;
                return;
            }
            if(fillSelected){
                let [i, j] = getIndex(canvasMap, e.target);
                let starterColor = e.target.color;
                fillCanvas(canvasMap, i, j, starterColor, primaryColor, true);
            }else{
                object.style.backgroundColor = primaryColor;
                object.color = primaryColor;
                object.filled = true;
            }
        }
        );

        object.addEventListener('contextmenu', function(e){
            if(eraserSelected){
                object.style.backgroundColor = bgColor;
                object.color = bgColor;
                object.filled = false;
                return;
            }
            if(fillSelected){
                let [i, j] = getIndex(canvasMap, e.target);
                let starterColor = e.target.color;
                fillCanvas(canvasMap, i, j, starterColor, secondaryColor, true);
            }else{
                object.style.backgroundColor = secondaryColor;
                object.color = secondaryColor;
                object.filled = true;
            }
        }
        );
}

function resetCanvasContainer(){
    canvasContainer.innerHTML = "";
    canvasMap = [];
}
function clearCanvas(){
    for (let j = 0; j < canvasMap.length; j++){
        for (let i = 0; i < canvasMap.length; i++) {
            canvasMap[i][j].style.backgroundColor = bgColor;
            canvasMap[i][j].color = bgColor;
            canvasMap[i][j].filled = false;
       }
    }
}

function changeBackground(){
    bgColor = bgInput.value
    for (let j = 0; j < canvasMap.length; j++){
        for (let i = 0; i < canvasMap.length; i++) {
            if(!canvasMap[i][j].filled){
                canvasMap[i][j].style.backgroundColor = bgInput.value;
                canvasMap[i][j].color = bgInput.value;
            }
       }
    }
}

function toggleGrid(){
    for (let j = 0; j < canvasMap.length; j++){
        for (let i = 0; i < canvasMap.length; i++) {
                canvasMap[i][j].classList.toggle("no-grid");
       }
    }
    gridButton.classList.toggle("button-selected")
}

// handles toggle button/switch
function toggleFill(){
    eraserSelected = false;
    eraserButton.classList.remove("button-selected")
    if(fillSelected){
        fillSelected = false;
    }else{
        fillSelected = true;
    }
    fillButton.classList.toggle("button-selected");
}
function toggleEraser(){
    fillSelected = false;
    fillButton.classList.remove("button-selected")
    if(eraserSelected){
        eraserSelected = false;
    }else{
        eraserSelected = true;
    }
    eraserButton.classList.toggle("button-selected");
}


let fillButton = document.getElementById("fill-button");

// gets index from selected pixel
function getIndex(matrix, object) {
    for (let i = 0; i < matrix.length; i++) {
      let j = matrix[i].indexOf(object);
      if (j > -1) {
        return [i, j];
      }
    }
  }

// fill recursive function
function fillCanvas(matrix, i, j, selectionColor, fillColor, fill){
    if(!(i >= 0 && i < matrix.length && j >= 0 && j < matrix.length)){
        return;
    }
    if(matrix[i][j].color == fillColor)
    {
        return;
    }
    if(matrix[i][j].color != selectionColor){
        return;
    }
    matrix[i][j].style.backgroundColor = `${fillColor}`;
    matrix[i][j].color = fillColor;
    matrix[i][j].filled = fill;
    fillCanvas(matrix, i + 1, j, selectionColor, fillColor, fill);
    fillCanvas(matrix, i - 1, j, selectionColor, fillColor, fill);
    fillCanvas(matrix, i, j + 1, selectionColor, fillColor, fill);
    fillCanvas(matrix, i, j -1, selectionColor, fillColor, fill);
}

// init
generateMatrix(10, 10);
gridButton.addEventListener('click', toggleGrid)
clearButton.addEventListener('click', clearCanvas)
primaryButton.addEventListener('input', () => {primaryColor = primaryButton.value;});
secondaryButton.addEventListener('input', () => {secondaryColor = secondaryButton.value;});
bgInput.addEventListener('input', changeBackground);
canvasSlider.addEventListener('input', () => {
    canvasSliderText.textContent = `${canvasSlider.value} x ${canvasSlider.value}`;
    gridButton.classList.add("button-selected");
    changeGridSize(canvasSlider.value);
    resetCanvasContainer();
    generateMatrix(gridSize, gridSize);
    });
fillButton.addEventListener("click", toggleFill);
eraserButton.addEventListener('click', toggleEraser);
saveButton.addEventListener('click', function() {
    html2canvas(element, {
        onrendered: function(canvas) {
            getCanvas = canvas;
            var imgageData = getCanvas.toDataURL("image/png");
            var a = document.createElement("a");
            a.href = imgageData;
            a.download = "Image.png";
            a.click();
        }
    });
});
//
primaryColor = primaryButton.value;
secondaryColor = secondaryButton.value;
