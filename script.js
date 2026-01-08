const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 1️⃣ Kamera icazəsi soruş və video stream göstər
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("Camera access denied or not available.");
        console.error(err);
    });

// 2️⃣ Capture düyməsinə basanda şəkil çəkmək
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show canvas
    canvas.classList.remove('hidden');

    // Fun animation
    canvas.classList.remove('animate-fun');
    void canvas.offsetWidth; // reflow
    canvas.classList.add('animate-fun');
});
