(function () {
  var ecosystem = [
    {
      icon: "fa-building",
      en: "Property Management",
      es: "Gestión de Propiedades",
    },
    { icon: "fa-calculator", en: "Accounting", es: "Contabilidad" },
    { icon: "fa-store", en: "Marketplace", es: "Mercado" },
    { icon: "fa-users", en: "Investor Network", es: "Red de Inversionistas" },
    { icon: "fa-graduation-cap", en: "Education", es: "Educación" },
    { icon: "fa-robot", en: "AI Advisor", es: "Asesor IA" },
    {
      icon: "fa-briefcase",
      en: "Business Management",
      es: "Gestión Empresarial",
    },
    {
      icon: "fa-layer-group",
      en: "Multi-Asset Management",
      es: "Gestión Multi-Activo",
    },
  ];

  // Mismo idioma que ya decidió i18n.js (o "en" si es la primera visita)
  var lang = localStorage.getItem("veva-lang") || "en";

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
      labelEl.textContent = ecosystem[index][lang];
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
