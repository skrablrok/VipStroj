let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}



window.onscroll = function() { stickyNavbar() };

var navbar = document.querySelector(".nav_bar"); // Select the navbar element
var sticky = navbar.offsetTop; // Get the initial offset position of the navbar

function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky"); // Add the sticky class when scroll past the navbar
    } else {
        navbar.classList.remove("sticky"); // Remove the sticky class when at the top
    }
}































const gallery = document.querySelector('.scroll_galerija');
const bar = document.querySelector('.bar');
const thumb = document.querySelector('.scroll');

if (gallery && bar && thumb) {

let dragging = false;
let startY;
let startThumbTop;

function updateThumb() {
  const ratio = gallery.scrollTop / (gallery.scrollHeight - gallery.clientHeight);
  const maxTop = bar.clientHeight - thumb.clientHeight;
  thumb.style.top = ratio * maxTop + "px";
}

gallery.addEventListener('scroll', updateThumb);

thumb.addEventListener('mousedown', e => {
  dragging = true;
  startY = e.clientY;
  startThumbTop = parseFloat(getComputedStyle(thumb).top);
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const dy = e.clientY - startY;
  let newTop = startThumbTop + dy;
  const maxTop = bar.clientHeight - thumb.clientHeight;
  newTop = Math.max(0, Math.min(newTop, maxTop));
  thumb.style.top = newTop + "px";
  const ratio = newTop / maxTop;
  gallery.scrollTop = ratio * (gallery.scrollHeight - gallery.clientHeight);
});

document.addEventListener('mouseup', () => dragging = false);

}









































































let currentStep = 0;
const steps = document.querySelectorAll('.step');
const progress = document.querySelector('.progress');

function animateStep() {
    // 1. reset širine brez animacije
    progress.style.transition = 'none';
    progress.style.width = '0%';

    // 2. počakaj 1 render frame → nato zaženi animacijo
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            progress.style.transition = 'width 5s linear'; // ⬅ 5 sekund
            progress.style.width = '100%';
        });
    });

    // 3. po koncu animacije (5s) zamenjaj številko
    setTimeout(() => {
        steps[currentStep].classList.remove("active");
        currentStep = (currentStep + 1) % steps.length;
        steps[currentStep].classList.add("active");

        animateStep();
    }, 5000); // mora biti *isti* čas kot CSS
}

if (steps.length && progress) animateStep();











































const heroData = [
  {
    slika: "index/hero-1.jpg",
    naslov: "GRADIMO TRDNE TEMELJE PRIHODNOSTI",
    opis: "Z inovativnimi rešitvami, kakovostnimi materiali in izkušeno ekipo ustvarjamo objekte, ki trajajo generacije.",
    gumb: "Kontaktirajte nas",
    link: "kontakt.html"
  },
  {
    slika: "index/hero-2.jpg",
    naslov: "ZANESLJIVOST, KI TRAJA",
    opis: "Naše delo temelji na natančnosti, zaupanju in dolgoletnih izkušnjah pri gradnji kompleksnih objektov.",
    gumb: "Več o nas",
    link: "o_nas.html"
  },
  {
    slika: "index/hero-3.jpg",
    naslov: "GRADIMO ZA PRIHODNOST",
    opis: "Usmerjamo se v moderne gradbene rešitve, ki trajnostno izboljšujejo življenjski prostor.",
    gumb: "naše storitve",
    link: "storitve.html"
  }
];

let indexHero = 0;
const glava = document.querySelector(".glava");
const naslovEl = document.querySelector(".leva_hero .naslov h1");
const opisEl = document.querySelector(".leva_hero .podnaslov p");
const gumbEl = document.querySelector(".leva_hero .gumb button");
const gumbLink = document.querySelector(".leva_hero .gumb a");

function updateHero() {
  indexHero = (indexHero + 1) % heroData.length;

  glava.style.backgroundImage = `
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.56) 0%,
      rgba(0, 0, 0, 0.56) 70%,
      rgba(37, 36, 36, 1) 100%
    ),
    url('${heroData[indexHero].slika}')
  `;

  // Fade-out
  naslovEl.style.opacity = 0;
  opisEl.style.opacity = 0;
  gumbEl.style.opacity = 0;

  setTimeout(() => {
    // Posodobimo besedila
    naslovEl.textContent = heroData[indexHero].naslov;
    opisEl.textContent = heroData[indexHero].opis;
    gumbEl.textContent = heroData[indexHero].gumb;
    gumbLink.href = heroData[indexHero].link;

    // Fade-in
    naslovEl.style.opacity = 1;
    opisEl.style.opacity = 1;
    gumbEl.style.opacity = 1;
  }, 300);
}

if (glava && naslovEl) setInterval(updateHero, 5000);