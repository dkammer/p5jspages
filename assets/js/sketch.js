function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    //when mouse button is pressed, circles turn black
    if (mouseIsPressed === true) {
        fill(0);
    } else {
        fill(255);
    }

    //white circles drawn at mouse position
    if (mouseX + mouseY > 0) circle(mouseX, mouseY, 100);
}