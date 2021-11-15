const MOBILE_TO_DESKTOP = 1000;
const SCROLL_DELAY = 80;

const body = document.body
function resize() {
    const width = window.innerWidth;
    const isMobile = width < MOBILE_TO_DESKTOP;
    body.classList.toggle('mobile', isMobile);
    body.classList.toggle('desktop', !isMobile);
}

const nav = document.querySelector('header');
function updateNav() {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav--scrolled', scrollY > SCROLL_DELAY)
}

async function main() {
    window.addEventListener('resize', resize);
    resize();
    window.addEventListener('scroll', updateNav)
    updateNav()
}

main();