const photoInput = document.getElementById('photoInput');
const animateBtn = document.getElementById('animateBtn');
const animatedPhoto = document.getElementById('animatedPhoto');

animateBtn.addEventListener('click', () => {
    const file = photoInput.files[0];
    if (!file) {
        alert("Please upload a photo first!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        animatedPhoto.src = e.target.result;
        animatedPhoto.classList.remove('hidden');

        // Simple animation: bounce + brightness change
        animatedPhoto.classList.add('animate-bounce', 'transition-transform', 'duration-700');

        // Optional: remove class after animation to allow replay
        setTimeout(() => {
            animatedPhoto.classList.remove('animate-bounce');
        }, 700);
    }
    reader.readAsDataURL(file);
});
