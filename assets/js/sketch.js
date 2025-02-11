// Made with the help of
// https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js
// https://github.com/TetsuakiBaba/p5MediaPipe/tree/v0.10.20/hands-landmarker-gesture-recognition
// https://www.npmjs.com/package/@mediapipe/tasks-vision?activeTab=readme

let gestures_results;
let cam = null;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // When gestures are found, the following function is called. The detection results are stored in results.
    gotGestures = function (results) {
        gestures_results = results;
    }

    startWebcam();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function startWebcam() {
    // If the function setCameraStreamToMediaPipe is defined in the window object, the camera stream is set to MediaPipe.
    if (window.setCameraStreamToMediaPipe) {
        cam = createCapture(VIDEO);
        cam.hide();
        cam.elt.onloadedmetadata = function () {
            window.setCameraStreamToMediaPipe(cam.elt);
        }
    }
}

function draw() {
    let camWidth = 320;
    let camHeight = camWidth * 3 / 4
    let palmX = -1;
    let palmY = -1;
    let activeGesture = '';

    if (cam) {
        image(cam, 0, 0, camWidth, camHeight);
    }

    if (gestures_results) {
        if (gestures_results.landmarks) {
            for (const landmarks of gestures_results.landmarks) {
                let landmarkCounter = 0;
                for (let landmark of landmarks) {
                    let landmarkX = landmark.x * camWidth;
                    let landmarkY = landmark.y * camHeight;
                    if(landmarkX < camWidth - 10 && landmarkY < camHeight - 10) {
                        noStroke();
                        fill(100, 150, 210);
                        circle(landmarkX, landmarkY, 10);
                        textSize(7);
                        fill(2);
                        textAlign(CENTER, CENTER);
                        text(landmarkCounter, landmarkX, landmarkY);
                    }
                    if (landmarkCounter == 0) {
                        palmX = landmark.x * width;
                        palmY = landmark.y * height;
                    }
                    landmarkCounter++;
                }
            }
        }
        for (let i = 0; i < gestures_results.gestures.length; i++) {
            noStroke();
            fill(255, 0, 0);
            textSize(12);
            let name = gestures_results.gestures[i][0].categoryName;
            let score = gestures_results.gestures[i][0].score;
            let right_or_left = gestures_results.handednesses[i][0].hand;
            let pos = {
              x: gestures_results.landmarks[i][0].x * camWidth,
              y: gestures_results.landmarks[i][0].y * camHeight,
            };
            fill(0);
            textAlign(CENTER, CENTER);
            if (pos.x < camWidth - textWidth(name) / 2 && pos.y < camHeight - 12) {
                text(name, pos.x, pos.y);
            }
            activeGesture = name;
          }
    }

    //when hand is a fist, circles turn black
    if (activeGesture === 'Closed_Fist') {
        fill(0);
    } else {
        fill(255);
    }

    //white circles drawn at palm position
    if (palmX + palmY > 0) circle(palmX, palmY, 100);

    if (activeGesture === 'Pointing_Up') {
        clear();
    }
}