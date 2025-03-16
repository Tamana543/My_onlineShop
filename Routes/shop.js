const path = require("path")
const express = require("express")
const router = express.Router()
const shopProduct = require("../controller/admin")

// router.get("/",rootPath)
router.get("/shop/product_list",shopProduct.productsShop)

router.get("/products")

router.get("/cart")

router.get("/checkout")
module.exports = router
