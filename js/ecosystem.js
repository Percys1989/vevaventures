(function () {
  var nodes = document.querySelectorAll(".eco-node");
  var tag = document.getElementById("ecoCenterTag");
  if (!nodes.length || !tag) return;

  function currentLang() {
    return document.documentElement.getAttribute("lang") || "en";
  }

  nodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      var lang = currentLang();
      tag.textContent =
        node.getAttribute("data-desc-" + lang) ||
        node.getAttribute("data-desc-en");
    });
    node.addEventListener("mouseleave", function () {
      var lang = currentLang();
      tag.textContent =
        tag.getAttribute("data-default-" + lang) ||
        tag.getAttribute("data-default-en");
    });
    // Soporte táctil: mostrar la descripción al tocar
    node.addEventListener("touchstart", function () {
      var lang = currentLang();
      tag.textContent =
        node.getAttribute("data-desc-" + lang) ||
        node.getAttribute("data-desc-en");
    });
  });
})();
