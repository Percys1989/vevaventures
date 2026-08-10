(function () {
  var form = document.getElementById("foundersForm");
  if (!form) return;

  var SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbx5iTmKgFB8kmQ2UvX32Ly0TSUOR51KpDSCoNq9BtFDLwhGhef0sAyUGIeYggnA0AOg/exec";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector(".form-submit");
    var originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    var formData = new FormData(form);

    // --- Envío a mailer.php (igual que antes) ---
    var mailPromise = fetch(form.action, {
      method: "POST",
      body: formData,
    }).then(function (r) {
      return r.json();
    });

    // --- Envío a Google Sheets (en paralelo) ---
    var sheetsData = {
      fname: formData.get("fname") || "",
      femail: formData.get("femail") || "",
      fphone: formData.get("fphone") || "",
      frole: formData.get("frole") || "",
      funits: formData.get("funits") || "",
      freferral: formData.get("freferral") || "",
      fchallenge: formData.get("fchallenge") || "",
    };
    console.log("datos que se enviaran", sheetsData);
    var sheetsPromise = fetch(SHEETS_URL, {
      method: "POST",
      body: JSON.stringify(sheetsData),
    }).catch(function () {
      // Si Sheets falla, no bloqueamos al usuario
      console.warn("Google Sheets: no se pudo guardar el registro.");
    });

    // --- Esperamos ambos, pero el resultado lo da mailer ---
    Promise.all([mailPromise, sheetsPromise])
      .then(function (results) {
        var data = results[0];
        if (data.success) {
          form.innerHTML =
            "<p style=\"text-align:center; padding:24px 0; font-family:var(--display); font-weight:600; font-size:17px; color:var(--deep);\">Thanks! You're on the Founders List — we'll be in touch soon.</p>";
        } else {
          throw new Error(
            (data.errors && data.errors.join(" ")) || "Submission failed",
          );
        }
      })
      .catch(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert(
          "Something went wrong. Please try again or email us directly at Software.contact@vevaventures.com.",
        );
      });
  });
})();
