const hamburger = document.querySelector('#hamburger-6');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  navbar.classList.toggle('open');
});

document.querySelectorAll('.links_bar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    hamburger.classList.remove('is-active');
  });
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
      location.reload();
    })
    .catch(err => console.log(err));
  });
}

function handleCartDelete(button) {
  const form = button.closest("form");

  openConfirm(() => {
    form.submit();
  });
}
function openConfirm(action) {
  selectedAction = action;
  if (!modal) return console.error("Modal not found");
  modal.classList.remove("hidden");
}
window.handleAdminDelete = handleAdminDelete;
window.handleCartDelete = handleCartDelete;