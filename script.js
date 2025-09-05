document.addEventListener("DOMContentLoaded", () => {
  // ===== MODAL LOGIN =====
  const modal = document.getElementById("login");
  const btnLogin = document.querySelectorAll(".btn-login");
  const closeBtn = document.querySelector(".fechar-modal");
  const formLogin = document.getElementById("form-login");
  const mensagem = document.getElementById("mensagem-login");

  function abrirModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function fecharModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    if (mensagem) mensagem.style.display = "none";
  }

  if (modal && closeBtn) {
    btnLogin.forEach(btn => {
      btn.addEventListener("click", e => {
        if (btn.tagName === "BUTTON" && btn.type === "submit") return;
        e.preventDefault();
        abrirModal();
      });
    });

    closeBtn.addEventListener("click", fecharModal);
    window.addEventListener("click", e => {
      if (e.target === modal) fecharModal();
    });
  }

  if (formLogin && mensagem) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();
      const { username, password } = formLogin;
      const user = username.value.trim();
      const pass = password.value.trim();

      if (user === "admin" && pass === "123") {
        mensagem.textContent = "✅ Login realizado com sucesso!";
        mensagem.className = "mensagem sucesso";
        setTimeout(() => formLogin.submit(), 1500);
      } else {
        mensagem.textContent = "❌ Usuário ou senha incorretos.";
        mensagem.className = "mensagem erro";
      }
      mensagem.style.display = "block";
    });
  }

  // ===== NAVBAR SCROLL =====
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector("nav ul.menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => menu.classList.toggle("show"));
  }

  // ===== PRODUTOS CARROSSEL =====
  const grid = document.querySelector(".produtos-grid");
  const cards = document.querySelectorAll(".produto-card");
  const prevBtn = document.querySelector(".carrossel-btn.prev");
  const nextBtn = document.querySelector(".carrossel-btn.next");
  const wrapper = document.getElementById("produtosWrapper");

  let index = 0;
  let itemsToShow = 3;
  let interval;

  function updateItemsToShow() {
    itemsToShow =
      window.innerWidth <= 480 ? 1 :
      window.innerWidth <= 768 ? 2 : 3;
  }

  function showSlide(i) {
    const totalItems = cards.length;
    if (totalItems <= itemsToShow) return;

    index = i < 0 ? totalItems - itemsToShow :
            i > totalItems - itemsToShow ? 0 : i;

    const offset = -(index * (100 / itemsToShow));
    grid.style.transform = `translateX(${offset}%)`;
  }

  function startAutoScroll() {
    interval = setInterval(() => showSlide(index + 1), 5000);
  }

  function stopAutoScroll() {
    clearInterval(interval);
  }

  if (grid && cards.length) {
    updateItemsToShow();
    showSlide(index);
    startAutoScroll();

    prevBtn?.addEventListener("click", () => showSlide(index - 1));
    nextBtn?.addEventListener("click", () => showSlide(index + 1));
    window.addEventListener("resize", () => {
      updateItemsToShow();
      showSlide(index);
    });

    wrapper?.addEventListener("mouseenter", stopAutoScroll);
    wrapper?.addEventListener("mouseleave", startAutoScroll);
  }
});