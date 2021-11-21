const MOBILE_TO_TABLET = 700;
const TABLET_TO_DESKTOP = 1000;
const SCROLL_DELAY = 80;

const body = document.body;
const nav = document.querySelector("header");
let scrollTimeout = null;

function resize() {
  const width = window.innerWidth;
  body.classList.toggle("mobile", width < MOBILE_TO_TABLET);
  body.classList.toggle(
    "tablet",
    (width >= MOBILE_TO_TABLET) & (width < TABLET_TO_DESKTOP)
  );
  body.classList.toggle("desktop", width >= TABLET_TO_DESKTOP);
}

function updateNav() {
  const scrollY = window.scrollY;
  nav.classList.toggle("nav--scrolled", scrollY > SCROLL_DELAY);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
  scrollTimeout = setTimeout(function () {
    body.querySelectorAll("section").forEach((elem) => {
      if (
        elem.offsetTop < scrollY + 200 && // Выше секции
        elem.offsetTop + elem.scrollHeight > scrollY + 10 // Но она умещается целиком
      ) {
        const sectionName = elem.getAttribute("id");
        location.hash = "#" + sectionName;
        if (!body.classList.contains("desktop")) {
          // Обновляем секцию в select (если не desktop)
          const selectSection = body.querySelector("#select-section");
          selectSection.value = sectionName;
        }
      }
    });
  }, 100);
}

async function main() {
  window.addEventListener("resize", resize);
  resize();
  window.addEventListener("scroll", updateNav);
  updateNav();
}

main();
