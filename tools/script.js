const video = document.getElementById('video');
const photo = document.getElementById('photo');
const info = document.getElementById('info');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');

let stream = null;

startBtn.addEventListener('click', async () => {
  info.textContent = 'İcazələr istənilir...';

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

    // Yer məlumatı
    let geoText = 'Yer məlumatı alınmadı';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          geoText = `Enlik: ${pos.coords.latitude.toFixed(6)}
Uzunluq: ${pos.coords.longitude.toFixed(6)}
Dəqiqlik: ±${Math.round(pos.coords.accuracy)} m`;
          updateInfo(geoText, ipText);
        },
        (err) => {
          geoText = `Yer xətası: ${err.message}`;
          updateInfo(geoText, ipText);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }

    // IP məlumatı
    let ipText = 'IP məlumatı alınır...';
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      ipText = `IP: ${data.ip}
Ölkə: ${data.country_name}
Şəhər: ${data.city || '—'}
ISP: ${data.org || '—'}`;
    } catch {
      ipText = 'IP məlumatı alınmadı (şəbəkə və ya CORS)';
    }

    updateInfo(geoText, ipText);

  } catch (err) {
    info.textContent = `Kamera icazəsi verilmədi və ya xəta baş verdi:\n${err.message}`;
  }
});

captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  photo.src = canvas.toDataURL('image/jpeg', 0.92);
  photo.hidden = false;
});

stopBtn.addEventListener('click', () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.classList.remove('active');
  }
  photo.hidden = true;
  captureBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  info.textContent = 'Kamera dayandırıldı.';
});

function updateInfo(geo, ip) {
  info.textContent = `${geo}\n\n${ip}`;
}
