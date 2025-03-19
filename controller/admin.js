const Products = require("../module/product.js")
exports.getAddProducts = (req,res,next)=> {
     res.render("admin/add-product",{
          pageTitle: "Add Product",
          path: '/admin/add-product',
          formsCSS: true,
                    productCSS: true,
                    activeAddProduct: true
               
               }) 
              
     }
exports.postproducts = (req,res,next)=> {
     // getting data from form add product page 
     const title = req.body.title; 
     const pageURL = req.body.imageUrl;
     const price = req.body.price;
     const description = req.body.description;
  const product = new Products(title,pageURL,description,price)
  product.save()
     res.redirect('/shop/product_list')
}

exports.adminProducts = (req,res,next)=>{
     Products.fetchAll((products)=> {

          res.render("admin/products",{prods : products, pageTitle : "Admins Products",path:"/admin/products",hasProducts:products.length > 0}) // express for more information 
     })  
}