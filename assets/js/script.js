import { GestureRecognizer, FilesetResolver } from "./vision_bundle.js";

let gestureRecognizer = undefined;
let runningMode = "VIDEO";

const createGestureRecognizer = async () => {
    // Create task for image file processing:
    const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        baseurl + "/assets/wasm"
    );

    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: baseurl + "/assets/models/gesture_recognizer.task",
            delegate: "GPU"
        },
        runningMode: runningMode,
        numHands: 2
    });
};
createGestureRecognizer();

let video = null;

export function setCameraStreamToMediaPipe(v) {
    video = v;
    video.addEventListener("loadeddata", predictWebcam);
    video = v;

}
window.setCameraStreamToMediaPipe = setCameraStreamToMediaPipe;

let lastVideoTime = -1;
let results = undefined;

async function predictWebcam() {
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime && gestureRecognizer !== undefined) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, startTimeMs);
    }
    gotGestures(results);

    if (!video.paused) {
        window.requestAnimationFrame(predictWebcam);
    }
}