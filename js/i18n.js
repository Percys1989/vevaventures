(function () {
  var toggle = document.getElementById("langToggle");
  var label = document.getElementById("langToggleLabel");
  if (!toggle || !label) return;

  var current = localStorage.getItem("veva-lang") || "en";

  function applyLang(lang) {
    // Textos simples (textContent)
    document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + lang);
    });

    // Textos con markup interno (innerHTML) — ej. el <h1> del hero con <br> y <span class="accent">
    document
      .querySelectorAll("[data-" + lang + "-html]")
      .forEach(function (el) {
        el.innerHTML = el.getAttribute("data-" + lang + "-html");
      });

    document.documentElement.setAttribute("lang", lang);
    label.textContent = lang === "es" ? "EN" : "ES"; // muestra el idioma AL QUE se puede cambiar
    localStorage.setItem("veva-lang", lang);
    current = lang;
  }

  toggle.addEventListener("click", function () {
    applyLang(current === "es" ? "en" : "es");
  });

  applyLang(current);
})();
