(function () {
  var MIN_DISPLAY = 2000; // ms — lets the floors + roof + windows finish drawing
  var start = Date.now();
  var pre = document.getElementById("preloader");
  if (!pre) {
    return;
  }

  function hide() {
    var elapsed = Date.now() - start;
    var wait = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(function () {
      pre.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      setTimeout(function () {
        pre.remove();
      }, 650);
    }, wait);
  }

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide);
  }
  // Safety net in case 'load' is delayed by slow assets
  setTimeout(hide, 4500);
})();
