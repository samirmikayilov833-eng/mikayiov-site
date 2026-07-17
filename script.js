// ====================================
// Scroll To Top
// ====================================

const topButton = document.getElementById("top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topButton.style.opacity = "1";
        topButton.style.pointerEvents = "auto";
    } else {
        topButton.style.opacity = "0";
        topButton.style.pointerEvents = "none";
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ====================================
// Navbar Blur
// ====================================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(10,15,35,.82)";
        navbar.style.backdropFilter = "blur(25px)";
        navbar.style.borderColor = "rgba(255,255,255,.12)";

    } else {

        navbar.style.background = "rgba(255,255,255,.05)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.borderColor = "rgba(255,255,255,.08)";

    }

});

// ====================================
// Card Hover Animation
// ====================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 12;
        const rotateX = -(y / rect.height - 0.5) * 12;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

// ====================================
// Animated Particle Background
// ====================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00d9ff";

        ctx.fill();

    }

}

for (let i = 0; i < 90; i++) {

    particles.push(new Particle());

}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    "rgba(0,217,255," +
                    (1 - distance / 120) * 0.25 +
                    ")";

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();

        p.draw();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();
// ====================================
// Mouse Interaction
// ====================================

const mouse = {
    x: null,
    y: null,
    radius: 160
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle update funksiyasını təkmilləşdir
Particle.prototype.update = function () {

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x >= canvas.width)
        this.speedX *= -1;

    if (this.y <= 0 || this.y >= canvas.height)
        this.speedY *= -1;

    if (mouse.x !== null) {

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {

            const force = (mouse.radius - distance) / mouse.radius;

            this.x += (dx / distance) * force * 2;
            this.y += (dy / distance) * force * 2;

        }

    }

};

// Siçan ilə xətlər
function connectMouse() {

    if (mouse.x === null) return;

    particles.forEach(p => {

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {

            ctx.beginPath();

            ctx.strokeStyle =
                "rgba(0,217,255," +
                (1 - distance / 140) * 0.35 +
                ")";

            ctx.moveTo(mouse.x, mouse.y);

            ctx.lineTo(p.x, p.y);

            ctx.stroke();

        }

    });

}

// animate funksiyasını yenilə
const oldAnimate = animateParticles;

animateParticles = function () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    connectMouse();

    requestAnimationFrame(animateParticles);

};

// Yenidən başladır
animateParticles();
