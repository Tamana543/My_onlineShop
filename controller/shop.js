const product = require("../module/product")
const Products = require("../module/product")
const Order = require('../module/order')

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
          const cart = user.cart.items;
          res.render("shop/cart",
               {prods : cart,
                pageTitle : "Your Cart",
                path:"/cart",
                hasProducts:cart.length > 0}) 
          
     }).catch(err=>{
          console.error(err)
     })
   
}
exports.postCardShop = (req,res,next)=>{
     // console.log(req.body.items.productId);
     const productId =req.body.productId ;
     console.log(req.body)
     
     Products.findById(productId)
     .then((respond)=>{
          return req.user.addToCart(respond)
     }).then(ans=>{
          res.redirect('/cart')

     })
     .catch(err=>console.error(err))
}
exports.orderProducts = (req,res,next)=>{
     Order.find({'user.userId': req.user._id})
     .then(products=> {

          res.render("shop/orders",
               {
                    order : products,
                     pageTitle : "Your Orders",
                     path:"/orders"
               }) 
     })
}
exports.orderPostProducts = (req,res,next)=>{
     const prodId =req.body.productId.trim();

     req.user.populate('cart.items.productId').then(user=>{
          const product = user.cart.items.map(i =>{
               return {quantity : i.quantity, product : {...i.productId._doc}}
          })
// console.log("DDDDDDDDD",req.user);
          const order = new Order({
               user : {
                    name : req.user.email,
                    userId : req.user
               },
               products : product
          })

          return order.save()
     }).then(result=>{
          console.log("Done 2nd", prodId);
           return req.user.deleteItemCard(prodId)
     }).then((result)=>{
           res.redirect("/orders")
     })
     .catch(err=>{
          console.log(err)
     })


}
exports.getidProduct = (req,res,next)=> {
     const prodId = req.params.productId;
     console.log(prodId);
     Products.findById(prodId).then(product => {
          res.render("shop/product_detail",{
               product : product,
               pageTitle : "Product detail",
               path : "/products"
          })
          
     }).catch(err=>{
          console.error(err)
     })
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

exports.deletePostProduct = (req,res,next)=>{
     const prodId = req.body.productId.trim()
     req.user.deleteItemCard(prodId).then(result =>{
          res.redirect("shop/cart")
     }).catch(err=>{
          console.log(err)
})
}