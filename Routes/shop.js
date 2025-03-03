const path = require("path")
const express = require("express")
const router = express.Router()
const rootPath = require("../utill/path")
const adminData = require("./admin")
router.get("/",(req,res,next)=> {
     // console.log(adminData.products);
     // res.sendFile(path.join(rootPath,"views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
     const products = adminData.products;
//   console.log(products);
     res.render("shop",{prods : products, PageTitle : "shop",path:"/shop",hasProducts:products.length > 0}) // express for more information 
})
module.exports = router
