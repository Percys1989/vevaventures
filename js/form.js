(function () {
  var form = document.getElementById("foundersForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector(".form-submit");
    var originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          form.innerHTML =
            "<p style=\"text-align:center; padding:24px 0; font-family:var(--display); font-weight:600; font-size:17px; color:var(--deep);\">Thanks! You're on the Founders List — we'll be in touch soon.</p>";
        } else {
          throw new Error(
            (data.errors && data.errors.join(" ")) || "Submission failed",
          );
        }
      })
      .catch(function (err) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert(
          "Something went wrong. Please try again or email us directly at contact@vevaventures.com.",
        );
      });
  });
})();
