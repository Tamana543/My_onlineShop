const path = require("path")
const express = require("express")
const addminController = require('../controller/admin')
const router = express.Router();
const { title } = require("process");
router.get("/add-product", addminController.getAddProducts);

router.get("/products", addminController.adminProducts);

router.post("/add-product",addminController.postproducts)

router.get("/admin/edit_products",addminController.editGitProduct)

router.delete('/product/:productId',addminController.deleteProduct)
module.exports = router;
// exports.routs = router;
// exports.products = products;