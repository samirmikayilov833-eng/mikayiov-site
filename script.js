/*==================================================
  MIKAYILOV.SITE
  script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       HERO ANIMATION
    ========================== */

    const heroTitle = document.querySelector(".hero h1");

    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(40px)";

    setTimeout(() => {

        heroTitle.style.transition = "1.2s ease";
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";

    }, 200);


    /* ==========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 40){

            header.style.background = "rgba(8,8,8,.70)";
            header.style.backdropFilter = "blur(20px)";
            header.style.borderBottom = "1px solid rgba(245,197,66,.12)";

        }else{

            header.style.background = "rgba(8,8,8,.30)";
            header.style.backdropFilter = "blur(12px)";
            header.style.borderBottom = "1px solid rgba(255,255,255,.04)";

        }

    });


    /* ==========================
       SCROLL TOP BUTTON
    ========================== */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){

            topBtn.style.display = "flex";

        }else{

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });


    /* ==========================
       CANVAS BACKGROUND
    ========================== */

    const canvas = document.getElementById("background");
    const ctx = canvas.getContext("2d");

    function resize(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resize();

    window.addEventListener("resize", resize);

    const particles = [];

    for(let i=0;i<70;i++){

        particles.push({

            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,

            r:Math.random()*2+1,

            dx:(Math.random()-0.5)*0.25,
            dy:(Math.random()-0.5)*0.25

        });

    }

    function draw(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        particles.forEach(p=>{

            ctx.beginPath();

            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

            ctx.fillStyle="rgba(245,197,66,.55)";

            ctx.fill();

            p.x+=p.dx;
            p.y+=p.dy;

            if(p.x<0 || p.x>canvas.width) p.dx*=-1;
            if(p.y<0 || p.y>canvas.height) p.dy*=-1;

        });

        requestAnimationFrame(draw);

    }

    draw();

});
