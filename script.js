//// VARIABLES
let canvasMap;
let canvasContainer = document.getElementById("canvas-container");
let canvasSlider = document.getElementById("canvas-slider");
let canvasSliderText = document.getElementById("canvas-slider-text");
let colorInput = document.getElementById("color-picker");
let clearButton = document.getElementById("clear-button");
let gridButton = document.getElementById("grid-button");

let gridSize = 30;
let currentColor;

let bgColor = ""
let bgInput = document.getElementById("color-background");

let fillSelected = false;

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
            if(e.buttons == 1){
                object.color = currentColor;
                object.style.backgroundColor = currentColor;
                object.filled = true;
            }else if(e.buttons == 2){
                object.color = bgColor;
                object.style.backgroundColor = bgColor;
                object.filled = false;
            }
        }
        );
//////////////////////////////////////////////////
        object.addEventListener('click', function(e){
            if(fillSelected){
                let [i, j] = getIndex(canvasMap, e.target);
                let starterColor = e.target.color;
                fillCanvas(canvasMap, i, j, starterColor);
            }else{
                object.style.backgroundColor = currentColor;
                object.color = currentColor;
                object.filled = true;
            }
        }
        );

        object.addEventListener('contextmenu', function(){
            object.style.backgroundColor = bgColor;
            object.color = bgColor;
            object.filled = false;
        }
        );
}

//////////////////////////////////////////////////


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
    if(fillSelected){
        fillSelected = false;
    }else{
        fillSelected = true;
    }
    fillButton.classList.toggle("button-selected");
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
function fillCanvas(matrix, i, j, selectionColor){
    if(!(i >= 0 && i < matrix.length && j >= 0 && j < matrix.length)){
        return;
    }
    if(matrix[i][j].color == currentColor)
    {
        return;
    }
    if(matrix[i][j].color != selectionColor){
        return;
    }
    matrix[i][j].style.backgroundColor = `${currentColor}`;
    matrix[i][j].color = currentColor;
    matrix[i][j].filled = true;
    fillCanvas(matrix, i + 1, j, selectionColor);
    fillCanvas(matrix, i - 1, j, selectionColor);
    fillCanvas(matrix, i, j + 1, selectionColor);
    fillCanvas(matrix, i, j -1, selectionColor);
}

// INIT
generateMatrix(10, 10);
gridButton.addEventListener('click', toggleGrid)
clearButton.addEventListener('click', clearCanvas)
colorInput.addEventListener('input', () => {currentColor = colorInput.value;});
bgInput.addEventListener('input', changeBackground);
canvasSlider.addEventListener('input', () => {
    canvasSliderText.textContent = `${canvasSlider.value} x ${canvasSlider.value}`;
    changeGridSize(canvasSlider.value);
    resetCanvasContainer();
    generateMatrix(gridSize, gridSize);
    });
fillButton.addEventListener("click", toggleFill);
currentColor = colorInput.value;
