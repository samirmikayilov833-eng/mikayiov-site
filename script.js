// DOM elements
const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("canvas");
const cartoon = document.getElementById("cartoon");

// 1️⃣ Kamera icazəsi soruş
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream)
.catch(() => alert("Camera permission denied"));

// 2️⃣ Şəkil çəkmə və saxlamaya icazə
captureBtn.onclick = async () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  // 3️⃣ Cartoon effekti (sadə vizual simulyasiya)
  cartoon.src = canvas.toDataURL("image/png");
  cartoon.style.filter = "contrast(140%) saturate(150%) blur(1.5px) hue-rotate(10deg)";

  // 4️⃣ Saxlama icazəsi soruş
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: "cartoon_photo.png",
      types: [{ description: "PNG Image", accept: {"image/png":[".png"]} }]
    });
    const writable = await handle.createWritable();
    await writable.write(await (await fetch(canvas.toDataURL())).blob());
    await writable.close();
    alert("Photo saved locally!");
  } catch(e){
    alert("Save cancelled.");
  }
};

