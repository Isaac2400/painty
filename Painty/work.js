//7 parts 

//1. make variable and conditions
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;

//get them elements lol
var brush = document.getElementById("brush"); //Brush 
var eraser = document.getElementById("erase"); //Eraser 
var color = document.getElementById("myColor"); //Color
var size = document.getElementById("myRange"); //Size
var reset = document.getElementById("reset"); //reset
var saveLink = document.getElementById("saveLink"); //saveLink element 

//set initial color conditions 
var myColor = color.value;
ctx.strokeStyle = myColor;

//set initial size conditions
var mySize = size.value;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);

//4. color change conditions
function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}

//5. size change conditions
function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}

//2.makke brush work
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvas, positionX, positionY) {
	if(mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();
		canvas.style.cursor = "pointer";
	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}

function brushMove(e) {
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
}

function brushUp() {
	mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
	var brushColor = document.getElementById("myColor");
	ctx.strokeStyle = brushColor.value;
	brush.style.border = "2px solid red";
	eraser.style.border = "none";
	
	canvas.addEventListener("mousedown", brushDown, false); //bubble phase
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
	
	canvas.addEventListener("touchstart", brushDown, false); //bubble phase
}

//3. make eraser work 
function eraserClick() {
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//6. Making the reset button work 


//7. making the save button work 
function saveClick() {
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
	console.log(data);
	saveLink.href = data;
	saveLink.download = "myImage.png";
}

//event Listeners for tools 
brush.addEventListener("click", brushClick); //brush click event 
eraser.addEventListener("click", eraserClick); //eraser click event
color.addEventListener("change", colorChange); //color change event 
size.addEventListener("change", sizeChange); //size change event  
saveLink.addEventListener("click", saveClick); //save click event 

canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);


function blend_colors(color1, color2, percentage)
{
    // check input
    color1 = color1 || '#000000';
    color2 = color2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (color1.length != 4 && color1.length != 7)
        throw new error('colors must be provided as hexes');

    if (color2.length != 4 && color2.length != 7)
        throw new error('colors must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
        throw new error('percentage must be between 0 and 1');

    // output to canvas for proof
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = 90;
    cvs.height = 25;
    document.body.appendChild(cvs);

    // color1 on the left
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, 30, 25);

    // color2 on the right
    ctx.fillStyle = color2;
    ctx.fillRect(60, 0, 30, 25);

    // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
    //      the three character hex is just a representation of the 6 hex where each character is repeated
    //      ie: #060 => #006600 (green)
    if (color1.length == 4)
        color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
    else
        color1 = color1.substring(1);
    if (color2.length == 4)
        color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
    else
        color2 = color2.substring(1);   

    console.log('valid: c1 => ' + color1 + ', c2 => ' + color2);

    // 3: we have valid input, convert colors to rgb
    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

    console.log('hex -> rgba: c1 => [' + color1.join(', ') + '], c2 => [' + color2.join(', ') + ']');

    // 4: blend
    var color3 = [ 
        (1 - percentage) * color1[0] + percentage * color2[0], 
        (1 - percentage) * color1[1] + percentage * color2[1], 
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];

    console.log('c3 => [' + color3.join(', ') + ']');

    // 5: convert to hex
    color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

    console.log(color3);

    // color3 in the middle
    ctx.fillStyle = color3;
    ctx.fillRect(30, 0, 30, 25);

    // return hex
    return color3;
}