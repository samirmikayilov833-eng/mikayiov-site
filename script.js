const text = document.getElementById("text");

// Yazı yavaş-yavaş böyüsün
text.style.transition = "transform 0.8s";

setInterval(() => {
  text.style.transform = "scale(1.1)";
  setTimeout(() => {
    text.style.transform = "scale(1)";
  }, 400);
}, 800);

// Klikləyəndə emoji əlavə olsun
text.addEventListener("click", () => {
  text.innerText += " 😊";
});


