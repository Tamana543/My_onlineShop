const path = require("path")
const express = require("express")
const router = express.Router()
const shopController = require("../controller/shop")

// router.get("/",rootPath)
router.get("/shop/product_list",shopController.indexProducts)

router.get("/products",shopController.productsShop)

router.get("/cart",shopController.cartProducts)

router.get("/orders",shopController.orderProducts)

router.get("/checkout",shopController.checkoutProducts)
module.exports = router
