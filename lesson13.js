'use strict';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// GLOBALS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


// @TO-DO: add center point coordinates (x and y)

let x = canvas.width / 2;
let y = canvas.height / 2;
console.log(x,y);

window.addEventListener("resize", () => {
    x = canvas.width / 2;
    y = canvas.height / 2;
    drawShape(); 
    // Redraw shape on resize
});

// shortcuts for forms
let shapesForm = document.forms.options;

const formElements =Array.from(document.forms.options.elements);

formElements.forEach(element => {
    element.addEventListener('change', drawShape);
});


// init
window.addEventListener("load", drawShape);

window.addEventListener("load", () => {
    drawShape(); 
    // Calculate and draw shape on initial load
    calculateSize(); 
    // Calculate size on initial load
});

document.getElementById("calculate").addEventListener("click", calculateSize);

function calculateSize() {
    // Your code to calculate the size of the shape and update the display
}

document.forms.calculate.addEventListener("submit", function(event) {
    event.preventDefault(); 
    // Prevent form submission

    // Call calculateSize function to calculate and display size
    calculateSize();
});

// Add event listener to update radius label
document.getElementById('radius').addEventListener('input', function() {
    let radiusValue = this.value;
    document.getElementById('radiusLabel').textContent = `Radius = ${radiusValue}px`;
});

document.getElementById('width').addEventListener('input', function() {
    let widthValue = parseFloat(this.value);
    if (widthValue < 0) {
        this.value = 0; 
        // Reset to zero if negative value entered
    } else if (widthValue > 300) {
        this.value = 300; 
        // Reset to maximum value if value exceeds 300
    }
});

// Add event listener to height input
document.getElementById('height').addEventListener('input', function() {
    let heightValue = parseFloat(this.value);
    if (heightValue < 0) {
        this.value = 0; 
        // Reset to zero if negative value entered
    } else if (heightValue > 300) {
        this.value = 300; 
        // Reset to maximum value if value exceeds 300
    }
});
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// EVENT LISTENTERS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const sizeForm = document.forms.size;

const radiusInput = sizeForm.elements.radius;
const widthInput = sizeForm.elements.width;
const heightInput = sizeForm.elements.height;

radiusInput.addEventListener('input', drawShape);
widthInput.addEventListener('input', drawShape);
heightInput.addEventListener('input', drawShape);


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAW SHAPE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function drawShape(event) {
    // KEEPS FORM FROM SUBMITTING AT THIS POINT
    if (event) {
        event.preventDefault();
    }

    // CLEARS PREVIOUS DRAWING FROM CANVAS ELEMENT
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setColor();
    showBorder();

    // @TO-DO: GRAB THE VALUE OF THE SELECTED SHAPE
    let shape = document.getElementById('shape').value;

    switch (shape) {
        case 'circle':
            drawCircle();
            break;
        case 'triangle':
            drawTriangle();
            break;
        case 'square':
            drawSquare();
            break;
        case 'rectangle':
            drawRectangle();
            break;
        default:
            break;
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAWING OPTIONS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function setColor() {
    // @TO-DO: Set the fill style to the color selected
    let colors = document.querySelectorAll('[name="color"]');

    ctx.fillStyle = 'black';

    for (const color of colors) {
        if (color.checked) {
            ctx.fillStyle = color.id;
        }
    }
}
function showBorder() {
    // @TO-DO: Set the border to appear if checked
    let border = shapesForm.border;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0;


    if (border.checked) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAW EACH KIND OF SHAPE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function drawCircle() {
    let radius = document.getElementById('radius').value;
    ctx.arc(x, y, radius, 0, 360);
    ctx.stroke();
    ctx.fill();
}
function drawTriangle() {
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    ctx.beginPath();

    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x + width / 2, y + height / 2);
    ctx.lineTo(x - width / 2, y + height / 2);

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function drawSquare() {
    let width = document.getElementById('width').value;
    ctx.fillRect(x - width / 2, y - width / 2, width, width);
    ctx.strokeRect(x - width / 2, y - width / 2, width, width);
}
function drawRectangle() {
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    ctx.fillRect(x - width / 2, y - width / 2, width, height);
    ctx.strokeRect(x - width / 2, y - width / 2, width, height);
}

function calculateSize() {
    let shape = document.getElementById('shape').value;
    let radius = parseFloat(document.getElementById('radius').value);
    let width = parseFloat(document.getElementById('width').value);
    let height = parseFloat(document.getElementById('height').value);

    let area, perimeter;

    switch (shape) {
        case 'circle':
            area = Math.PI * radius * radius;
            perimeter = 2 * Math.PI * radius;
            break;
        case 'triangle':
            area = 0.5 * width * height;
            perimeter = width + 2 * Math.sqrt((width ** 2 + height ** 2) / 4);
            break;
        case 'square':
            area = width * width;
            perimeter = 4 * width;
            break;
        case 'rectangle':
            area = width * height;
            perimeter = 2 * (width + height);
            break;
        default:
            break;
    }

        // Format area and perimeter with superscript for units and use .toFixed() to control decimals
    let areaStr = `${area.toFixed(2)} <sup>px</sup><sup>2</sup>`;
    let perimeterStr = `${perimeter.toFixed(2)} px`;

    document.getElementById('size').innerHTML = `Shape area: ${area.toFixed(2)} px<br>Shape perimeter: ${perimeter.toFixed(2)} px`;
}