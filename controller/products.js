const products =[];
exports.postproducts = (req,res,next)=> {
     products.push({title : req.body.title})
     res.redirect('/')
}
exports.getAddProducts = (req,res,next)=> {
res.render("add-product",{pageTitle: "Add Product",
     path: '/admin/add-product',
     formsCSS: true,
               productCSS: true,
               activeAddProduct: true}) 
         
}

exports.productsShop = (req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     // const products = adminData.products;
//   console.log(products);
     res.render("shop",{prods : products, pageTitle : "shop",path:"/shop",hasProducts:products.length > 0}) // express for more information 
}
