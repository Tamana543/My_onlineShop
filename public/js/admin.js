
// const deleteProduct = (btn)=>{

// const productId = btn.parentNode.querySelector('[name=productId]').value
// const btnParent = btn.closest('article')


// fetch('/admin/product/'+productId,{
//      method : 'DELETE',

   
// }).then(result=>{
// return result.json()
// }).then(()=>{
// console.log("Done From admin public");
// btnParent.parentNode.removeChild(btnParent)
// // btnParent.remove()
// }).catch(err=>{
//      console.log(err);
// })
// };

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