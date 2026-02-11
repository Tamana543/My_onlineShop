const Products = require("../module/product")
exports.getAddProducts = (req,res,next)=> {
     try {
          res.render("admin/add-product",{
               pageTitle: "Add Product",
               path: '/admin/add-product',
                    csrfToken : req.csrfToken()
                     
                    }) 
                    
          
     } catch (error) {
          console.log(error);
     }
          
              
     }
exports.postproducts = (req,res,next)=> {
     // console.log( req.body.imageUrl);
     // getting data from form add product page 
     const title = req.body.title; 
     const imageUrl = req.body.imageUrl;
     const price = req.body.price;
     const description = req.body.description;

  const productData = new Products(
    { title :  title,
     imageUrl : imageUrl,
     description : description,
     price : price,
csrfToken : req.csrfToken(),
   
     }
)

console.log(productData);

productData.save().then(reult=>{
     console.log('Done');

     res.redirect('/shop/product_list')
}).catch(err=>{
     console.log(err);
})
    
}

exports.adminProducts = (req,res,next)=>{
     Products.find().then((products)=> {

          res.render("admin/products",{
               prods : products, 
               pageTitle : "Admins Products",
               path:"/admin/products",
               hasProducts:products.length > 0,
}) // express for more information 
     })  
}
exports.deleteProduct = (req,res,next)=>{
  const prodId = req.params.productId.trim();

  Products.findByIdAndDelete(prodId)
  .then(result => {
    if(!result){
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({ message: "Deleting failed" });
  });
};

exports.editGitProduct = (req,res,next)=>{
     const prodID = req.params.productID ;
     // console.log(prodID);

     Products.findById(prodID).then(product=>{
          if(!product){
               return res.redirect('/products')
          }
          res.render("admin/edit_products",{
               pageTitle: "Edit Product",
               path: '/admin/products',
               product : product,
csrfToken : req.csrfToken()

               
          })

     }).catch(err=>{
          console.log(err);
     })
}
exports.editPostProduct = (req,res,next) =>{
    const prodId = req.body.prodId
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.imageUrl
    const updatedDescription = req.body.description;

    Products.findById(prodId) .then(product=>{
     //     console.log(product);
     
     product.title = updatedTitle;
     product.price = updatedPrice;
     product.description = updatedDescription;
     product.imageUrl = updatedImage;
     return product.save().then(result=>{
          res.redirect('/products')
     }).catch(err=>console.log("Error here",err))

    })

}