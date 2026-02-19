const videoElement = document.getElementById("video");
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");

let lastCommand = "";
let camera;
let detectionActive = false;

// Inicializar MediaPipe Hands usando async/await
async function initHandTracking() {
    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    });

    hands.onResults(onResults);

    camera = new Camera(videoElement, {
        onFrame: async () => {
            if (detectionActive) {
                await hands.send({ image: videoElement });
            }
        },
        width: 480,
        height: 360
    });

    camera.start();
}

function onResults(results) {

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
        output.innerText = "Orden no reconocida";
        return;
    }

    const landmarks = results.multiHandLandmarks[0];
    const handedness = results.multiHandedness[0].label;

    const tolerance = 0.02;

    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];

    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];

    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];

    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];

    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];

    // ===== DETECCIÓN DEDOS =====

    const thumbUp = thumbTip.y < thumbIP.y - tolerance;
    const thumbDown = thumbTip.y > thumbIP.y + tolerance;

    const indexUp = indexTip.y < indexPIP.y - tolerance;
    const middleUp = middleTip.y < middlePIP.y - tolerance;
    const ringUp = ringTip.y < ringPIP.y - tolerance;
    const pinkyUp = pinkyTip.y < pinkyPIP.y - tolerance;

    // 🔵 SOLO CONTAMOS 4 DEDOS (SIN PULGAR)
    const fingersCount =
        (indexUp ? 1 : 0) +
        (middleUp ? 1 : 0) +
        (ringUp ? 1 : 0) +
        (pinkyUp ? 1 : 0);

    // ===== PULGAR LATERAL =====
    const thumbRight = thumbTip.x > thumbMCP.x + 0.05;
    const thumbLeft = thumbTip.x < thumbMCP.x - 0.05;

    // ===== PALMA O DORSO =====
    const palmFacing =
        handedness === "Right"
            ? landmarks[5].x < landmarks[17].x
            : landmarks[5].x > landmarks[17].x;

    // ==========================
    // REGLAS (orden correcto)
    // ==========================

    // 🔄 360°
    if (fingersCount === 4 && thumbUp && palmFacing) {
        output.innerText = "360° derecha";
    }

    else if (fingersCount === 4 && thumbUp && !palmFacing) {
        output.innerText = "360° izquierda";
    }

    // 🛑 Detener (solo pulgar abajo)
    else if (thumbDown && fingersCount === 0) {
        output.innerText = "Detener";
    }

    // ↪ 90° derecha
    else if (thumbRight && fingersCount === 0) {
        output.innerText = "90° izquierda";
    }

    // ↩ 90° izquierda
    else if (thumbLeft && fingersCount === 0) {
        output.innerText = "90° derecha";
    }

    // 🚶 Avanzar (1 dedo)
    else if (fingersCount === 1) {
        output.innerText = "Avanzar";
    }

    // 🔙 Retroceder (2 dedos)
    else if (fingersCount === 2) {
        output.innerText = "Retroceder";
    }

    // ➡ Vuelta derecha (3 dedos)
    else if (fingersCount === 3) {
        output.innerText = "Vuelta derecha";
    }

    // ⬅ Vuelta izquierda (4 dedos sin pulgar)
    else if (fingersCount === 4 && !thumbUp) {
        output.innerText = "Vuelta izquierda";
    }

    else {
        output.innerText = "Orden no reconocida";
    }
}







startBtn.addEventListener("click", async () => {

    if (!camera) {
        await initHandTracking();
    }

    detectionActive = !detectionActive;

    if (detectionActive) {
        output.innerText = "Reconocimiento activado";
        startBtn.innerText = "Detener";
        startBtn.classList.remove("btn-success");
        startBtn.classList.add("btn-danger");
    } else {
        output.innerText = "Reconocimiento detenido";
        startBtn.innerText = "Empezar";
        startBtn.classList.remove("btn-danger");
        startBtn.classList.add("btn-success");
    }
});

