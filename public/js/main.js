const hamburger = document.querySelector('#hamburger');
const navbar = document.querySelector('.navbar');
const modal = document.getElementById("confirmModal");

let selectedAction = null;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("open");
});


const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

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
  console.log("DELETE CLICKED");
  openConfirm(() => {
    fetch('/admin/delete-product/' + productId, {
      method: 'DELETE',
      headers: {
        'csrf-token': csrfToken
      }
    })
    .then(res => res.json())
    .then(() => location.reload())
    .catch(err => console.log(err));
  });
}

function handleCartDelete(button) {
  const form = button.closest("form");

  openConfirm(() => {
    form.submit();
  });
}


// Checkout UI

const paymentSelect = document.getElementById("paymentMethod");
const cardDetails = document.getElementById("cardDetails");
const cardInput = document.querySelector('#cardDetails input');

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

// Checkout Success (Backend) 

const checkoutForm = document.getElementById("checkoutForm");
const successModal = document.getElementById("successModal");
const successBtn = document.getElementById("successBtn");
const csrfToken = document.querySelector('input[name="_csrf"]').value;
const submitBtn = document.getElementById("checkout_submit");




if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("SUBMIT WORKING");

    // const formData = new FormData(checkoutForm);
    // formData.append('_csrf', csrfToken);

   fetch("/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "csrf-token": csrfToken
  },
  body: JSON.stringify({
    name: checkoutForm.name.value,
    address: checkoutForm.address.value,
    payment: checkoutForm.payment.value
  })
})
    .then(res => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(data => {
      if (data.success) {
        successModal.classList.remove("hidden");
      }
    })
    .catch(err => console.log(err));
  });
}

successBtn?.addEventListener("click", () => {
  window.location.href = "/";
  submitBtn.disabled = true;
submitBtn.innerText = "Processing...";
});

window.handleAdminDelete = handleAdminDelete;
window.handleCartDelete = handleCartDelete;