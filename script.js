(function () {
  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("primary-nav");

  if (!header || !toggle || !nav) return;

  var navLinks = nav.querySelectorAll("a");

  function setHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    nav.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  function toggleMenu() {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
})();

initShinyText();

function initShinyText() {
  var nodes = document.querySelectorAll("[data-shiny]");
  if (!nodes.length) return;

  nodes.forEach(function (el) {
    var speed = Number(el.dataset.speed || 2);
    var delay = Number(el.dataset.delay || 0);
    var color = el.dataset.color || "#b5b5b5";
    var shineColor = el.dataset.shineColor || "#ffffff";
    var spread = Number(el.dataset.spread || 120);
    var pauseOnHover = el.dataset.pauseOnHover === "true";
    var disabled = el.dataset.disabled === "true";

    el.style.setProperty("--shiny-color", color);
    el.style.setProperty("--shiny-shine", shineColor);
    el.style.setProperty("--shiny-spread", spread + "deg");
    el.style.setProperty("--shiny-speed", speed + "s");
    el.style.setProperty("--shiny-delay", delay + "s");

    if (disabled) {
      el.style.animation = "none";
      el.style.backgroundImage = "none";
      el.style.color = color;
      el.style.webkitTextFillColor = color;
      return;
    }

    if (pauseOnHover) {
      el.addEventListener("mouseenter", function () {
        el.classList.add("is-paused");
      });
      el.addEventListener("mouseleave", function () {
        el.classList.remove("is-paused");
      });
    }
  });
}