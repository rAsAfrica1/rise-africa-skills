(function () {
  function attachToggles() {
    var inputs = document.querySelectorAll('input[type="password"]');
    inputs.forEach(function (input) {
      if (input.dataset.hasToggle) return;
      input.dataset.hasToggle = "1";
      var wrap = document.createElement("div");
      wrap.style.position = "relative";
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
      input.style.paddingRight = "2.4rem";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "\uD83D\uDC41";
      btn.style.position = "absolute";
      btn.style.right = "0.5rem";
      btn.style.top = "50%";
      btn.style.transform = "translateY(-50%)";
      btn.style.background = "transparent";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "1.1rem";
      btn.style.color = "#9a9ab0";
      btn.style.padding = "0";
      btn.style.margin = "0";
      btn.style.width = "auto";
      btn.addEventListener("click", function () {
        if (input.type === "password") {
          input.type = "text";
          btn.textContent = "\uD83D\uDE48";
        } else {
          input.type = "password";
          btn.textContent = "\uD83D\uDC41";
        }
      });
      wrap.appendChild(btn);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachToggles);
  } else {
    attachToggles();
  }
})();