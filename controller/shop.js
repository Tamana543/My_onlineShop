const product = require("../module/product")
const Products = require("../module/product")

exports.productsShop = (req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     // const products = adminData.products;
//   console.log(products);
//  Products.fetchAll(products=> {

//       res.render("shop/product_list",{
//           prods : products, pageTitle : "All Products",path:"/products",hasProducts:products.length > 0}) // express for more information 
//  })
Products.find().then(respond=>{
res.render("shop/product_list",{
pageTitle : "All Products List",
path:"/products",
prods : respond
})
}).catch(err=>{
     console.error(err)
})
}
exports.cartProducts = (req,res,next)=>{
     console.log(req.user);
     // getting the card items to show 
     req.user.populate('cart.items.productId').then(user=>{

     }).catch(err=>{
          console.error(err)
     })
     Products.find().then(products=> {

          res.render("shop/cart",{prods : products, pageTitle : "Your Cart",path:"/cart",hasProducts:products.length > 0}) 
     })
}
exports.postCardShop = (req,res,next)=>{
     // console.log(req.body.items.productId);
     const productId =req.body.productId ;
 console.log(productId);
     Products.findById(productId)
     .then((respond)=>{
          return req.user.addToCart(respond)
     }).then(ans=>{
          res.redirect('/cart')

     })
     .catch(err=>console.error(err))
}
exports.orderProducts = (req,res,next)=>{
     Products.find().then(products=> {

          res.render("shop/orders",{prods : products, pageTitle : "Your Orders",path:"/orders"}) 
     })
}
exports.getidProduct = (req,res,next)=> {
     const prodId = req.params.productId;
     Products.findById(prodId,product => {
          console.log(product);
     })
     res.redirect("/shop/product_list")
}
exports.indexProducts = (req,res,next)=>{
     Products.find().then(result=>{
          res.render("shop/index",
               {prods : result, pageTitle : "shop",path:"/shop"}
          ) 

     }).catch(err=> {
          console.error(err);
          
     })
     // Products.fetchAll((products)=> {

     // })  
}
exports.checkoutProducts = (req,res,next)=>{
   
  Products.find().this(products=>{

       res.render("shop/checkout",{prods : products, pageTitle : "checkout",path:"/checkout",}) 
  })
    
}