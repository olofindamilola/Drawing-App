const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () =>{
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDraw =() => {
    isDrawing = true;
    ctx.beginPath(); // creatng new path to draw
}

const drawing = (e) => {
    if(!isDrawing) return; //if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line wikth color
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);