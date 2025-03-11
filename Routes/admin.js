const path = require("path")
const express = require("express")
const router = express.Router();
const addProductController = require('../controller/products.js')
const { title } = require("process");
router.get("/add-product", addProductController.getAddProducts);
router.post("/product",addProductController.postproducts)
module.exports = router;
// exports.routs = router;
// exports.products = products;