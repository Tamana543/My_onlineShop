const path = require('path')

const Products = require("../module/product.js")


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
     const imageURL = req.body.imageURL;
     const price = req.body.price;
     const description = req.body.description;

  const productData = new Products(
     title,
     imageURL,
     description,
     price
)
console.log(productData);
  productData.save()
res.redirect('/shop/product_list')
    
}

exports.adminProducts = (req,res,next)=>{
     Products.fetchAll((products)=> {

          res.render("admin/products",{
               prods : products, pageTitle : "Admins Products",path:"/admin/products",hasProducts:products.length > 0}) // express for more information 
     })  
}