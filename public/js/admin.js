const deleteProduct = (btn)=>{
const productId = btn.parentNode.querySelector('[name= productId]').value
const btnParent = btn.closest('article')

fetch('/admin/product/'+productId,{
     method : 'DELETE',
}).then(result=>{
return result.json()
}).then(()=>{
console.log("Done From admin public");
btnParent.parentNode.removeChild(btnParent)
}).catch(err=>{
     console.log(err);
})
};