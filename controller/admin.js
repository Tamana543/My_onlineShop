const Products = require("../module/product")
const { validationResult } = require("express-validator");

exports.getAddProducts = (req,res,next)=> {
     try {
          res.render("admin/add-product",{
               pageTitle: "Add Product",
               path: '/admin/add-product',
                    csrfToken : req.csrfToken(),
                     errorMessage: null,
                    oldInput: {
                         title: "",
                         imageUrl: "",
                         price: "",
                         description: "",
                         category: ""
                    }
               }) 
                    
          
     } catch (error) {
          console.log(error);
     }
          
              
     }
exports.postproducts = (req,res,next)=> {

     const title = req.body.title; 
     const imageUrl = req.body.imageUrl;
     const price = req.body.price;
     const description = req.body.description;
     const category = req.body.category
     const stock = +req.body.stock
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
          return res.status(422).render("admin/add-product", {
          pageTitle: "Add Product",
          path: "/admin/add-product",
          csrfToken: req.csrfToken(),

          errorMessage: errors.array()[0].msg,

          oldInput: {
               title: req.body.title,
               imageUrl: req.body.imageUrl,
               price: req.body.price,
               description: req.body.description,
               category: req.body.category
          }
          });
     }

  const productData = new Products(
    { title :  title,
     imageUrl : imageUrl,
     description : description,
     price : price,
     category : category,
     userId: req.user._id,
     stock : stock
   
     }
)

// console.log(productData);

productData.save()
.then(() => {
     req.session.toast = {
          message: "Product added successfully ",
          type: "success"
     };

     res.redirect('/admin/products')
})
.catch(err => {
     console.log(err);

     req.session.toast = {
          message: "Failed to add product ",
          type: "error"
     };

     res.redirect('/admin/add-product');
});
    
}

exports.adminProducts = (req,res,next)=>{
     const toast = req.session.toast;
     req.session.toast = null;
     Products.find({ userId: req.user._id }) .then((products)=> {

          res.render("admin/products",{
               prods : products, 
               pageTitle : "Admins Products",
               path:"/admin/products",
               hasProducts:products.length > 0,
               csrfToken: req.csrfToken() ,
               toast: toast
}) // express for more information 
     })  
}
exports.deleteProduct = (req,res,next)=>{
  const prodId = req.params.productId.trim();
     
  Products.findOneAndDelete({ _id: prodId, userId: req.user._id })
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
     const prodID = req.params.productID;
     // console.log(prodID);
Products.findOne({ _id: prodID, userId: req.user._id }) .then(product=>{
          if(!product){
               return res.redirect('/admin/products')
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
    const updatedStock = +req.body.stock;

    Products.findOne({ _id: prodId, userId: req.user._id }) .then(product=>{
     //     console.log(product);
     
     product.title = updatedTitle;
     product.price = updatedPrice;
     product.description = updatedDescription;
     product.imageUrl = updatedImage;
     product.stock = updatedStock;
     return product.save().then(result=>{
          res.redirect('/admin/products')
     }).catch(err=>console.log("Error here",err))

    })

}