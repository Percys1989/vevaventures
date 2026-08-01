(function () {
  var ecosystem = [
    { icon: "fa-building", label: "Property Management" },
    { icon: "fa-calculator", label: "Accounting" },
    { icon: "fa-store", label: "Marketplace" },
    { icon: "fa-users", label: "Investor Network" },
    { icon: "fa-graduation-cap", label: "Education" },
    { icon: "fa-robot", label: "AI Advisor" },
    { icon: "fa-briefcase", label: "Business Management" },
    { icon: "fa-layer-group", label: "Multi-Asset Management" },
  ];

  var preloader = document.getElementById("preloader");
  var iconEl = document.getElementById("plEcoIcon");
  var labelEl = document.getElementById("plEcoLabel");
  var percentEl = document.getElementById("plPercent");
  var barEl = document.getElementById("plBar");

  if (!preloader) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    return;
  }

  // --- Ciclo de íconos del ecosistema ---
  var i = 0;
  function showItem(index) {
    iconEl.classList.remove("is-visible");
    setTimeout(function () {
      iconEl.innerHTML =
        '<i class="fa-solid ' + ecosystem[index].icon + '"></i>';
      labelEl.textContent = ecosystem[index].label;
      iconEl.classList.add("is-visible");
    }, 260); // coincide con el fade-out antes de cambiar contenido
  }
  showItem(0);
  var iconTimer = setInterval(function () {
    i = (i + 1) % ecosystem.length;
    showItem(i);
  }, 900);

  // --- Barra + porcentaje ---
  var count = 0;
  var barTimer = setInterval(function () {
    count++;
    percentEl.textContent = count;
    barEl.style.width = count + "%";
    if (count >= 100) {
      clearInterval(barTimer);
      clearInterval(iconTimer);
      setTimeout(function () {
        preloader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
      }, 400);
    }
  }, 55); // ~5.5s de carga total — suficiente para ver todo el ciclo de íconos
})();
