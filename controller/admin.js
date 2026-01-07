const path = require('path')

const Products = require("../module/product")
const deleteHelper = require("../util/file")

exports.getAddProducts = (req,res,next)=> {
     try {
          res.render("admin/add-product",{
               pageTitle: "Add Product",
               path: '/admin/add-product',
                     
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
               prods : products, pageTitle : "Admins Products",path:"/admin/products",hasProducts:products.length > 0}) // express for more information 
     })  
}
exports.deleteProduct =(req,res,next)=>{
     const prodId = req.params.productId.trim()
     // console.log(prodId);
     Products.findById(prodId).then(product=>{
          if(!product){
               return next(new Error("Product Not found"))
          }
          
     })
     deleteHelper.deleteFile(Products.imageUrl);
     return Products.deleteOne(
          {
               _id : prodId, 
               productId : req.user._id
          }).then(()=>{
               res.status(200).json(
                    {
                         message: "Product Deleted"
                    }
               )
          }).catch(err=> {
               res.status(500).json(
                    {
                         message : "Product does not deleted"
                    }
               )
          }).catch(err=>{
               console.log(err)
               next(err)
          })


}