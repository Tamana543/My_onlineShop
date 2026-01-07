const path = require('path')

const Products = require("../module/product")


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
     console.log(prodId);
}