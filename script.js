// ===== MODAL LOGIN =====
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("login");
  const btnLogin = document.querySelectorAll(".btn-login");
  const closeBtn = document.querySelector(".fechar-modal");

  if (modal && btnLogin.length && closeBtn) {
    btnLogin.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // bloqueia scroll
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
});

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ===== HAMBURGER MENU MOBILE =====
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector("nav ul.menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});

// ===== PRODUTOS CARROSSEL =====
document.addEventListener("DOMContentLoaded", () => {
  const produtosGrid = document.querySelector(".produtos-grid");
  const prevBtn = document.querySelector(".carrossel-btn.prev");
  const nextBtn = document.querySelector(".carrossel-btn.next");
  const produtoCards = document.querySelectorAll(".produto-card");

  let index = 0;
  let itemsToShow = 3;

  function updateItemsToShow() {
    if (window.innerWidth <= 480) itemsToShow = 1;
    else if (window.innerWidth <= 768) itemsToShow = 2;
    else itemsToShow = 3;
  }

  function showSlide(i) {
    const totalItems = produtoCards.length;
    if (totalItems <= itemsToShow) return;

    if (i < 0) index = totalItems - itemsToShow;
    else if (i > totalItems - itemsToShow) index = 0;
    else index = i;

    const offset = -(index * (100 / itemsToShow));
    produtosGrid.style.transform = `translateX(${offset}%)`;
  }

  function initCarrossel() {
    updateItemsToShow();
    showSlide(index);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => showSlide(index - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => showSlide(index + 1));
    }

    window.addEventListener("resize", () => {
      updateItemsToShow();
      showSlide(index);
    });

    setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  }

  if (produtosGrid && produtoCards.length) {
    initCarrossel();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".produtos-grid");
  const cards = document.querySelectorAll(".produto-card");
  const prevBtn = document.querySelector(".carrossel-btn.prev");
  const nextBtn = document.querySelector(".carrossel-btn.next");
  const wrapper = document.getElementById("produtosWrapper");

  let index = 0;
  let itemsToShow = 3;
  let interval;

  function updateItemsToShow() {
    if (window.innerWidth <= 480) itemsToShow = 1;
    else if (window.innerWidth <= 768) itemsToShow = 2;
    else itemsToShow = 3;
  }

  function showSlide(i) {
    const totalItems = cards.length;
    if (totalItems <= itemsToShow) return;

    if (i < 0) index = totalItems - itemsToShow;
    else if (i > totalItems - itemsToShow) index = 0;
    else index = i;

    const offset = -(index * (100 / itemsToShow));
    grid.style.transform = `translateX(${offset}%)`;
  }

  function startAutoScroll() {
    interval = setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(interval);
  }

  updateItemsToShow();
  showSlide(index);
  startAutoScroll();

  prevBtn.addEventListener("click", () => showSlide(index - 1));
  nextBtn.addEventListener("click", () => showSlide(index + 1));
  window.addEventListener("resize", () => {
    updateItemsToShow();
    showSlide(index);
  });

  wrapper.addEventListener("mouseenter", stopAutoScroll);
  wrapper.addEventListener("mouseleave", startAutoScroll);
});
