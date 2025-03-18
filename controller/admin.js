const Products = require("../module/product.js")
exports.postproducts = (req,res,next)=> {
  const product = new Products(req.body.title)
  product.save()
     res.redirect('/shop/product_list')
}
exports.getAddProducts = (req,res,next)=> {
res.render("admin/add-product",{
     pageTitle: "Add Product",
     path: '/admin/add-product',
     formsCSS: true,
               productCSS: true,
               activeAddProduct: true
          
          }) 
         
}
exports.adminProducts = (req,res,next)=>{
     Products.fetchAll((products)=> {

          res.render("admin/products",{prods : products, pageTitle : "Admins Products",path:"/admin/products",hasProducts:products.length > 0}) // express for more information 
     })  
}