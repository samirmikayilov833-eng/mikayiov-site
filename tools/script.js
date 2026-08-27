const video = document.getElementById('video');
const photo = document.getElementById('photo');
const output = document.getElementById('output');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const saveBtn = document.getElementById('saveBtn');
const stopBtn = document.getElementById('stopBtn');

let stream = null;
let collected = {
  timestamp: null,
  ip: null,
  location: null,
  photo: null
};

startBtn.addEventListener('click', async () => {
  output.textContent = 'İcazələr istənilir...';

  try {
    // Kamera
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });
    video.srcObject = stream;
    video.classList.add('active');
    captureBtn.disabled = false;
    stopBtn.disabled = false;
    startBtn.disabled = true;

    // Yer
    let locationData = null;
    if (navigator.geolocation) {
      locationData = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          }),
          (err) => resolve({ error: err.message })
        );
      });
    }

    // IP
    let ipData = null;
    try {
      const res = await fetch('https://ipapi.co/json/');
      ipData = await res.json();
    } catch {
      ipData = { error: 'IP alınmadı' };
    }

    collected = {
      timestamp: new Date().toISOString(),
      ip: ipData,
      location: locationData,
      photo: null
    };

    render();
    saveBtn.disabled = false;

  } catch (err) {
    output.textContent = 'Xəta: ' + err.message;
  }
});

captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  photo.src = dataUrl;
  photo.hidden = false;
  collected.photo = dataUrl;
  render();
});

saveBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(collected, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tools-data-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

stopBtn.addEventListener('click', () => {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    video.srcObject = null;
    video.classList.remove('active');
  }
  photo.hidden = true;
  captureBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  output.textContent = 'Dayandırıldı.';
});

function render() {
  let text = `Vaxt: ${collected.timestamp}\n\n`;

  if (collected.ip) {
    text += `IP: ${collected.ip.ip || '—'}\n`;
    text += `Ölkə: ${collected.ip.country_name || '—'}\n`;
    text += `Şəhər: ${collected.ip.city || '—'}\n`;
    text += `ISP: ${collected.ip.org || '—'}\n\n`;
  }

  if (collected.location) {
    if (collected.location.error) {
      text += `Yer: ${collected.location.error}\n`;
    } else {
      text += `Enlik: ${collected.location.latitude}\n`;
      text += `Uzunluq: ${collected.location.longitude}\n`;
      text += `Dəqiqlik: ±${Math.round(collected.location.accuracy)} m\n`;
    }
  }

  if (collected.photo) {
    text += `\nŞəkil: çəkilib (JSON-da base64 kimi saxlanır)`;
  }

  output.textContent = text;
}
