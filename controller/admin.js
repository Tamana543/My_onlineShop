const Products = require("../module/product.js")
exports.postproducts = (req,res,next)=> {
  const product = new Products(req.body.title)
  product.save()
     res.redirect('/')
}
exports.getAddProducts = (req,res,next)=> {
res.render("admin/add-product",{pageTitle: "Add Product",
     path: '/admin/add-product',
     formsCSS: true,
               productCSS: true,
               activeAddProduct: true}) 
         
}
