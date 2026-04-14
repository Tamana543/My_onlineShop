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

let selectedAction = null;

const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

function openConfirm(action) {
  selectedAction = action;
  modal.classList.remove("hidden");
}

function closeConfirm() {
  modal.classList.add("hidden");
  selectedAction = null;
}

confirmBtn.addEventListener("click", () => {
  if (selectedAction) selectedAction();
  closeConfirm();
});

cancelBtn.addEventListener("click", closeConfirm);