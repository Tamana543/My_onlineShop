const Products = require("../module/product")
const Order = require('../module/order')
const invoice = require("../module/invooiceTemp")
const PDFDocument = require('pdfkit')
const User = require('../module/user')
const Review = require("../module/reviews");

const itemPerPage = 4;
exports.productsShop = (req,res,next)=> {
const page = +req.query.page || 1;

const min = req.query.min;
const max = req.query.max;
const category = req.query.category;



let filter ={};

// Filtering 
/// Price 
if(min || max){
     filter.price = {}
     if(min) filter.price.$gte = +min;
     if(max) filter.price.$lte = +max;
}

/// Category Filter 
if(category) {
     filter.category = category
}

// Pagination
let totalItem ;

Products.find(filter)
.countDocuments()
.then(num=>{
     totalItem = num;

     return Products.find(filter).skip((page - 1 ) * itemPerPage).limit(itemPerPage)

})
.then(respond=>{
     res.render("shop/product_list",{
          pageTitle : "All Products List",
          path:"/products",
          prods : respond,
          currentPage : page,
          hasNextPage : itemPerPage * page < totalItem,
          hasPreviousPage : page > 1 ,
          nextPage : page + 1,
          previousPage : page -1 ,
          lastPage : Math.ceil(totalItem / itemPerPage),
          min,
          max,
          category
     })
  
}).catch(err=>{
     console.error(err)
})
}
exports.cartProducts = (req,res,next)=>{
     // console.log(req);

  if(!req.user){
     return res.redirect('/login')
  }
     // getting the card items to show 
     req.user.populate('cart.items.productId').then(user=>{
            const cart = user.cart.items.filter(item => item.productId !== null);
          res.render("shop/cart",
               {prods : cart,
                pageTitle : "Your Cart",
                path:"/cart",
                hasProducts:cart.length > 0,
                isAuthCorrect : req.session.isLoggedin,
                csrfToken : req.csrfToken()
}) 
          
     }).catch(err=>{
          console.error(err)
     })
   
}
exports.postCardShop = (req,res,next)=>{
     // console.log(req.body.items.productId);
     const productId =req.body.productId ;
    //  console.log("Here",req.body)
     
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
                     path:"/orders",
                     csrfToken : req.csrfToken()
                    
               }) 
     })
}
exports.postReorder = (req, res, next) => {
  const orderId = req.body.orderId;

  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return res.redirect('/orders');
      }

      const promises = order.products.map(item => {
        return Products.findById(item.product._id)
          .then(product => {
            if (!product) return;

            let chain = Promise.resolve();

            for (let i = 0; i < item.quantity; i++) {
              chain = chain.then(() => req.user.addToCart(product));
            }

            return chain;
          });
      });

      return Promise.all(promises);
    })
    .then(() => {
      res.redirect('/cart'); 
    })
    .catch(err => console.log(err));
};

exports.invoiceFunction = (req,res,next)=>{
     const shouldDownload = req.query.download === "true";
     const orderId = req.params.orderId;
     // console.log(orderId);
     Order.findById(orderId).then(order=>{
          // console.log(order)
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
     Products.findById(prodId)
     .then(product => {

          return Review.find({ productId: prodId })
          .then(reviews => {

               let avgRating = 0;

               if(reviews.length > 0){
                    avgRating =
                      reviews.reduce((sum, r) => sum + r.rating, 0)
                      / reviews.length;
               }

               res.render("shop/product_detail",{
                    product : product,
                    pageTitle : "Product detail",
                    path : "/products",
                    reviews: reviews,
                    avgRating: avgRating.toFixed(1)
               });

          });

     })
     .catch(err=>{
          console.error(err);
     });
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
  const productId = req.query.productId;

  req.user.populate('cart.items.productId')
  .then(user=>{
    let selectedItems; 

    if(productId) {
      selectedItems = user.cart.items.filter(
        item => item.productId._id.toString() === productId.toString()
      );
    } else {
      selectedItems = user.cart.items;
    }

    res.render("shop/checkout", {
      prods: selectedItems,
      pageTitle: "Checkout",
      path: "/checkout",
      csrfToken: req.csrfToken()
    });

  })
  .catch(err=>console.log(err))
};
exports.checkoutPostProducts = (req,res,next)=>{
     const { name, address, payment } = req.body;
     req.user.populate('cart.items.productId')
     .then(user=>{
          const products = user.cart.items.map(item=>{
               return {
                    quantity: item.quantity,
                    product: {...item.productId._doc}
               };
          });

          const order = new Order({
               user :{
                    name: name, 
                    address: address,
                    userId: req.user._id
               },
               products : products,
               paymentMethod: payment,
               status : "Processing",
               createdAt: new Date()
          });
          return order.save().then(() => user.clearCart());
     
     }).then(()=>{
          res.redirect("/orders")
     }).catch(err =>console.log(err))
}
exports.paymentPostProduct = (req, res, next) => {
  const { name, address, payment, productId,quantity } = req.body;


  if (!req.user) {
    return res.status(401).json({ success: false });
  }

  req.user.populate('cart.items.productId')
    .then(user => {
      const item = user.cart.items.find(ind=>{
        return ind.productId._id.toString() === productId.toString()
      });
      if(!item){
        return res.status(404).json({success: false})
      }
      if (quantity < 1) {
        return res.status(400).json({ success: false });
      }
      const order = new Order({
        user: {
          name,
          address,
          userId: req.user._id
        },
        products: [{
          quantity: Number(quantity),
          product:{...item.productId._doc}
        }],
        paymentMethod: payment,
        status: payment === "card" ? "Paid" : "Pending",
        createdAt: new Date()
      });

      return order.save()
        .then(() => {
          // console.log(user._id)
         return req.user.deleteItemCard(productId)
    })
        .then(() => {
          console.log("ORDER SAVED"); 
          res.status(200).json({ success: true });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false });
    });
};
exports.deletePostProduct = (req,res,next)=>{
  const prodId = req.body.productId;

  req.user.deleteItemCard(prodId)
  .then(() => {
    res.status(200).json({ success: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ success: false });
  });
};
exports.searchProducts = (req, res, next) => {
  const searchTerm = req.query.q.trim();

  if (!searchTerm) {
    return res.redirect("/products");
  }

  Products.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: "textScore" } } 
  )
    .sort({ score: { $meta: "textScore" } }) 
    .then(products => {

      res.render("shop/product_list", {
        prods: products,
        pageTitle: "Search Results",
        path: "/search",
        isSearch: true,
        searchTerm: searchTerm
      });
    })
    .catch(err => console.log(err));
};

exports.postWishlist = (req, res, next) => {
  const prodId = req.body.productId;

  Products.findById(prodId)
    .then(product => {
      return req.user.addToWishlist(product); 
    })
    .then(() => {
      res.redirect('/wishlist');
    })
    .catch(err => console.log(err));
};

exports.getWishlist = (req, res, next) => {
  req.user
    .populate('wishlist.items.productId')
    .then(user => {
      const products = user.wishlist.items;

      res.render('shop/wishlist', {
        prods: products,
        pageTitle: 'Your Wishlist',
     //    path: '/wishlist',
     path : "/products",
        csrfToken: req.csrfToken()
      });
    })
    .catch(err => console.log(err));
};
exports.postRemoveWishlist = (req, res, next) => {
  const prodId = req.body.productId;

  req.user.removeFromWishlist(prodId)
    .then(() => {
      res.redirect('/wishlist');
    })
    .catch(err => console.log(err));
};

exports.postReview = (req,res,next)=>{
const productId = req.body.productId;
    const rating = req.body.rating;
    const reviewText = req.body.reviewText;

    const review = new Review({
        productId: productId,
        userId: req.user._id,
        username: req.user.email,
        rating: rating,
        reviewText: reviewText
    });

    review.save()
    .then(() => {

        req.session.toast = {
            message: "Review added successfully",
            type: "success"
        };

        res.redirect("/orders");

    })
    .catch(err => {
        console.log(err);

        req.session.toast = {
            message: "Failed to add review",
            type: "error"
        };

        res.redirect("/orders");
    });
}