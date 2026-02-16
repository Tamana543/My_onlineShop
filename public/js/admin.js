function deleteProduct(button){
     const prodId = button.dataset.productId;
     const csrf = button.dataset.csrf

     
  fetch('/admin/delete-product/' + prodId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrf
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Delete failed');
    }
    return res.json();
  })
  .then(() => {
    button.closest('article').remove();
  })
  .catch(err => {
    console.error(err);
    alert('Deleting failed');
  });
}
window.deleteProduct = deleteProduct;