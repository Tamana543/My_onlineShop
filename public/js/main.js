const hamburger = document.querySelector('#hamburger');
const navbar = document.querySelector('.navbar');
const modal = document.getElementById("confirmModal");
const paymentSelect = document.getElementById("paymentMethod");
const cardDetails = document.getElementById("cardDetails");
const cardInput = document.querySelector('#cardDetails input');
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const checkoutForm = document.getElementById("checkoutForm");
const csrfToken = document.querySelector('input[name="_csrf"]').value;
const submitBtn = document.getElementById("checkout_submit");
const serverToast = document.getElementById("server-toast");


let selectedAction = null;
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("open");
});



function openConfirm(action) {
  selectedAction = action;
  if (!modal) return console.error("Modal not found");
  modal.classList.remove("hidden");
}

function closeConfirm() {
  modal?.classList.add("hidden");
  selectedAction = null;
}

confirmBtn?.addEventListener("click", () => {
  console.log("CONFIRM CLICKED");
  if (selectedAction) selectedAction();
  closeConfirm();
});

cancelBtn?.addEventListener("click", () => {
  console.log("CANCEL CLICKED");
  closeConfirm();
});

function handleAdminDelete(productId, csrfToken) {
  openConfirm(() => {
    fetch('/admin/delete-product/' + productId, {
      method: 'DELETE',
      headers: {
        'csrf-token': csrfToken
      }
    })
    .then(res => res.json())
    .then(() => {
      showToast("Product deleted..", "success");
      setTimeout(() => location.reload(), 800);
    })
    .catch(() => {
      showToast("Delete failed", "error");
    });
  });
}

function handleCartDelete(button) {
  const form = button.closest("form");

  openConfirm(() => {
    fetch("/cart-delete-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": document.querySelector('input[name="_csrf"]').value
      },
      body: JSON.stringify({
        productId: form.querySelector('input[name="productId"]').value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      showToast("Item removed. ", "success");
      setTimeout(() => location.reload(), 800);
    })
    .catch(() => {
      showToast("Delete failed ", "error");
    });
  });
}


// Checkout UI



if (paymentSelect) {
  paymentSelect.addEventListener("change", () => {
    if (paymentSelect.value === "card") {
      cardDetails.classList.remove("hidden");
    } else {
      cardDetails.classList.add("hidden");
    }
  });
}

cardInput?.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0,16);
  value = value.replace(/(.{4})/g, "$1 ").trim();
  e.target.value = value;
});

//  Toast Box
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// Checkout Success (Backend) 
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    fetch("/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken
      },
      body: JSON.stringify({
        name: checkoutForm.name.value,
        address: checkoutForm.address.value,
        payment: checkoutForm.payment.value,
         productId: checkoutForm.productId.value,
         quantity: checkoutForm.quantity.value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(data => {
      if (data.success) {
        showToast("Oreder placed successfully.")
        setTimeout(() => {
          window.location.href = "/orders";
        }, 2000);
      }
    })
    .catch(err => {
      console.log(err);
      showToast("Something went wrong.","error")
      submitBtn.disabled = false;
      submitBtn.innerText = "Try Again";
    });
  });
}



if (serverToast) {
  const message = serverToast.dataset.message;
  const type = serverToast.dataset.type;

  if (message) {
    showToast(message, type);
  }
}


window.handleAdminDelete = handleAdminDelete;
window.handleCartDelete = handleCartDelete;