document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", function () {
    const btn = form.querySelector("button");
    if (!btn) return;

    const text = btn.querySelector(".btn-text");
    const spinner = btn.querySelector(".spinner");

    if (text && spinner) {
      text.style.display = "none";
      spinner.classList.remove("hidden");
    }

    btn.disabled = true;
  });
});