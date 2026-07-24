(function () {
  var MIN_DISPLAY = 2000; // ms — lets the floors + roof + windows finish drawing
  var start = Date.now();
  var pre = document.getElementById("preloader");
  var percentEl = document.getElementById("plPercent");
  if (!pre) {
    return;
  }

  // Animate the percentage counter in sync with the progress bar (~1.7s)
  if (percentEl) {
    var duration = 1700;
    var t0 = Date.now();
    var tick = setInterval(function () {
      var progress = Math.min(1, (Date.now() - t0) / duration);
      percentEl.textContent = Math.round(progress * 100) + "%";
      if (progress >= 1) {
        clearInterval(tick);
      }
    }, 40);
  }

  function hide() {
    var elapsed = Date.now() - start;
    var wait = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(function () {
      pre.classList.add("is-complete"); // triggers the ring pulse + slight zoom
      setTimeout(function () {
        pre.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
        setTimeout(function () {
          pre.remove();
        }, 650);
      }, 350);
    }, wait);
  }

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide);
  }
  setTimeout(hide, 4500);
})();
