const products =[];
exports.getAddProducts = (req,res,next)=> {
     (req,res,next)=> {
          res.render("addProduct",{pageTitle: "Add Product",path: '/app.product'}) 
         }
}
exports.postAddproducts = (req,res,next)=> {
     products.push({title : req.body.title})
     res.redirect('/')
}
exports.productsShop = (req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     // const products = adminData.products;
//   console.log(products);
     res.render("shop",{prods : products, pageTitle : "shop",path:"/shop",hasProducts:products.length > 0}) // express for more information 
}
