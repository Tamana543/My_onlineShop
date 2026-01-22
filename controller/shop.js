const Products = require("../module/product")
const Order = require('../module/order')
const invoice = require("../module/invooiceTemp")
const PDFDocument = require('pdfkit')

exports.productsShop = (req,res,next)=> {
     
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
     console.log(req);

  if(!req.user){
     return res.redirect('/login')
  }
     // getting the card items to show 
     req.user.populate('cart.items.productId').then(user=>{
          const cart = user.cart.items;
          res.render("shop/cart",
               {prods : cart,
                pageTitle : "Your Cart",
                path:"/cart",
                hasProducts:cart.length > 0,
                isAuthCorrect : req.session.isLoggedin
}) 
          
     }).catch(err=>{
          console.error(err)
     })
   
}
exports.postCardShop = (req,res,next)=>{
     // console.log(req.body.items.productId);
     const productId =req.body.productId ;
     console.log("Here",req.body)
     
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
   if(!req.user){
     return res.redirect('/login')
  }

     req.user.populate('cart.items.productId').then(user=>{
          const product = user.cart.items.find(item =>{
               // return {quantity : i.quantity, product : {...i.productId._doc}}
               return  item.productId._id.toString() === prodId.toString()
               })
        if(!product){
return res.redirect('/cart')
        }
// console.log("DDDDDDDDD",req.user);
          const order = new Order({
               user : {
                    name : req.user.email,
                    userId : req.user._id
               },
              products: [{
          quantity: product.quantity,
          product: { ...product.productId._doc }
        }]
          })

          return order.save().then(() => {
               console.log("Here", req.user);
               return  user.deleteItemCard(prodId);
          });
     }).then((result)=>{
           res.redirect("/orders")
     })
     .catch(err=>{
          console.log(err)
     })


}
exports.invoiceFunction = (req,res,next)=>{
     const shouldDownload = req.query.download === "true";
     const orderId = req.params.orderId;
     // console.log(orderId);
     Order.findById(orderId).then(order=>{
          console.log(order)
          if(!order){
               return next(new Error("No order Found"))
          }
          if(order.user.userId.toString()!== req.user._id.toString()){
               return next(new Error("Unauthorized"))
          }
   


     //PdfKit
     // invoice data 
    const invoiceData = {
        invoice_nr: orderId,
        shipping: {
          name: req.user.email,
          address: 'Online Shop',
          city: 'Remote',
          state: '',
          country: ''
        },
        items: order.products.map(p => ({
          item: p.product.title,
          description: p.product.description,
          quantity: p.quantity,
          amount: p.product.price * p.quantity * 100
        })),
        subtotal: order.products.reduce(
          (sum, p) => sum + p.product.price * p.quantity * 100,
          0
        ),
        paid: 0
      };


     // send to browser
     res.setHeader("Content-Type","application/pdf");
     res.setHeader(
          "Content-Disposition",
          shouldDownload
          ? 'attachment; filename="invoice-' + orderId + '.pdf"'
          : 'inline; filename="invoice-' + orderId + '.pdf"'
     );



        const doc = new PDFDocument({ size: "A4", margin: 50 });
      doc.pipe(res);

      invoice.generateHeader(doc);
      invoice.generateCustomerInformation(doc, invoiceData);
      invoice.generateInvoiceTable(doc, invoiceData);
      invoice.generateFooter(doc);

      doc.end();
}).catch(err=>{
     next(err)
})
     
}
exports.getidProduct = (req,res,next)=> {
     const prodId = req.params.productId;
     console.log(prodId);
     Products.findById(prodId).then(product => {
          res.render("shop/product_detail",{
               product : product,
               pageTitle : "Product detail",
               path : "/products",
               
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

       res.render("shop/checkout",{prods : products, pageTitle : "checkout",path:"/checkout",
isAuthCorrect : false}) 
  })
    
}

exports.deletePostProduct = (req,res,next)=>{
     const prodId = req.body.productId.trim()
     req.user.deleteItemCard(prodId).then(result =>{
          res.redirect("/cart")
     }).catch(err=>{
          console.log(err)
})
}

