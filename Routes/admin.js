const path = require("path")
const express = require("express")
const router = express.Router();
const addProductController = require('../controller/products')
const { title } = require("process");
router.get("/app.product",addProductController.getAddProducts)
router.post("/product",addProductController.postAddproducts)
module.exports = router;
// exports.routs = router;
// exports.products = products;