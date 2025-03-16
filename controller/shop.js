const Products = require("../module/product.js")

exports.productsShop = (req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     // const products = adminData.products;
//   console.log(products);
 Products.fetchAll((products)=> {

      res.render("shop/product_list",{prods : products, pageTitle : "shop",path:"/shop",hasProducts:products.length > 0,activeShop:true , productCSS : true}) // express for more information 
 })
}
