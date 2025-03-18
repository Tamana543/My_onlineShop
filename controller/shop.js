const Products = require("../module/product.js")

exports.productsShop = (req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     // const products = adminData.products;
//   console.log(products);
 Products.fetchAll(products=> {

      res.render("shop/product_list",{prods : products, pageTitle : "All Products",path:"/products",hasProducts:products.length > 0}) // express for more information 
 })
}
exports.cartProducts = (req,res,next)=>{
     Products.fetchAll((products)=> {

          res.render("shop/cart",{prods : products, pageTitle : "Your Cart",path:"/cart",hasProducts:products.length > 0}) // express for more information 
     })
}
exports.indexProducts = (req,res,next)=>{
     Products.fetchAll((products)=> {

          res.render("shop/index",{prods : products, pageTitle : "shop",path:"/shop",hasProducts:products.length > 0}) // express for more information 
     })  
}
exports.checkoutProducts = (req,res,next)=>{
   

          res.render("shop/checkout",{prods : products, pageTitle : "checkout",path:"/checkout",hasProducts:products.length > 0}) // express for more information 
      
}