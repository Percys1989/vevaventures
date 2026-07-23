(function () {
  var poster = document.getElementById("videoPoster");
  var video = document.getElementById("demoVideo");
  if (!poster || !video) return;
  poster.addEventListener("click", function () {
    poster.classList.add("is-hidden");
    video.setAttribute("controls", "");
    video.play();
  });
})();
