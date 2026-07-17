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
