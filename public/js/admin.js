console.log("First");
const deleteProduct = (btn)=>{
     console.log("Second");
const productId = btn.parentNode.querySelector('[name=productId]').value
const btnParent = btn.closest('article')


fetch('/admin/product/'+productId,{
     method : 'DELETE',

   
}).then(result=>{
return result.json()
}).then(()=>{
console.log("Done From admin public");
btnParent.parentNode.removeChild(btnParent)
// btnParent.remove()
}).catch(err=>{
     console.log(err);
})
};
window.deleteProduct = deleteProduct;