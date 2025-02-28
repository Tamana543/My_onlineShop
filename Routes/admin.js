const path = require("path")
const express = require("express")
const router = express.Router();
const rootPath = require("../utill/path");
const { title } = require("process");
const products =[];
router.get("/app.product",(req,res,next)=> {
 res.render("addProduct",{pageTitle: "Add Product",path: '/admin/app.product'})
})
router.post("/product",(req,res,next)=> {
     products.push({title : req.body.title})
     res.redirect('/')
})
// module.exports = router;
exports.routs = router;
exports.products = products;