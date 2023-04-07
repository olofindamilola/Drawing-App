const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
ctx = canvas.getContext("2d");

//global variables with default value
let prevMouseX, prevMouseY, snapshot
isDrawing = false;
selectedTool = "brush",
brushWidth = 5;

window.addEventListener("load", () =>{
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
   ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;// passing current MouseX position as prevMouseX value
    prevMouseY = e.offsetY; //passing current MouseY position as prevMouseY value
    ctx.beginPath(); // creatng new path to draw
    ctx.lineWidth = brushWidth; // passing brush sixe as line width
    //copying canvas data & passing as snapshot value ... this aviods dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; //if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); //adding copied canvas data on to this canvas

    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line wikth color
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    }
    
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { //adding click event to all tool option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);