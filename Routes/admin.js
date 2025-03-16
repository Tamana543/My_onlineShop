const path = require("path")
const express = require("express")
const router = express.Router();
const addminController = require('../controller/admin')
const { title } = require("process");
router.get("/add-product", addminController.getAddProducts);

router.get("/admin/products", addminController.adminProducts);

router.post("/product",addminController.postproducts)
module.exports = router;
// exports.routs = router;
// exports.products = products;