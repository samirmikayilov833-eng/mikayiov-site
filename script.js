console.log("script.js işə düşdü");

// Kameranı açma funksiyası (yalnız icazə verilsə)
const video = document.querySelector("#cameraStream");
const captureBtn = document.querySelector("#captureBtn");
const canvas = document.querySelector("#snapshot");
const result = document.querySelector("#result");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.log("Kamera açıla bilmədi:", err);
  });

// Şəkil çəkmə düyməsi
captureBtn.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  result.classList.add("animate");
  setTimeout(() => result.classList.remove("animate"), 1000);
});
