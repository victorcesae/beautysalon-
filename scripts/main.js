const nav = document.querySelector("#header nav");
const toggle = document.querySelectorAll("nav .toggle");
/* abre e fecha o menu clicandos nos itens class toggle */
toggle.forEach((element) => {
  element.addEventListener("click", function () {
    nav.classList.toggle("show");
  });
});
/* quando clicar em um item do menu ,fecha o menu */
const links = document.querySelectorAll("nav ul li a");

links.forEach((element) => {
  element.addEventListener("click", function () {
    nav.classList.remove("show");
    let current = document.querySelector("nav ul li a.active");
    current.classList.remove("active");
    element.classList.add("active");
  });
});
/* saber onde está o usuário durante a rolagem */
const sections = document.querySelectorAll("main section[id]");
function activeMenuAtCurrentSession() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const checkpointStartSection = checkpoint >= sectionTop;
    const checkpointEndSection = checkpoint <= sectionTop + sectionHeight;

    if (checkpointStartSection && checkpointEndSection) {
      links.forEach((element) => {
        let current = document.querySelector(
          "nav ul li a[href*=" + sectionId + "]"
        );
        if (current != element) {
          element.classList.remove("active");
        } else {
          current.classList.add("active");
        }
      });
    }
  });
}
/* mudar o header da página quando der scroll */

const header = document.querySelector("#header");
const navHeight = header.offsetHeight;

function changeHeaderWhenScroll() {
  if (window.scrollY > navHeight) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
}

/*Testimonials carousel slider swiper */
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true,
    },
  },
});
/* ScrollReveal: show elements on scroll page */

const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 700,
  reset: true,
});
scrollReveal.reveal(
  `
#home .text, #home .image,
#about .image , #about .text,
#services header, #services .card,
#testimonials header , #testimonials .testimonials,
#contact .text , #contact .links
`,
  { interval: 100 }
);

/*bottom back to top */
const backToTopButton = document.querySelector(".back-to-top");
const footer = document.querySelector("footer");
const home = document.querySelector("#home");

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add("show");
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 250
    ) {
      backToTopButton.classList.add("footer");
    } else {
      backToTopButton.classList.remove("footer");
    }
  } else {
    backToTopButton.classList.remove("show");
  }
}
/* WHEN SCROLL */
window.addEventListener("scroll", () => {
  backToTop();
  changeHeaderWhenScroll();
  activeMenuAtCurrentSession();
  if (window.scrollY > 0) {
    home.style.paddingTop = "12.5rem";
  } else {
    home.style.paddingTop = "calc(5rem + var(--header-height))";
  }
});
