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
