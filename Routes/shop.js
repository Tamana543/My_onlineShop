const path = require("path")
const express = require("express")
const router = express.Router()
const shopController = require("../controller/shop")

// router.get("/",rootPath)
router.get("/shop/product_list",shopController.indexProducts)
// to hundle id . Remember in here when you use : it means that the app should not only go through file to find exactly product but what data had been stored to the variable named that.
router.get("/products/:productId",shopController.getidProduct)
router.get("/products",shopController.productsShop)

router.get("/cart",shopController.cartProducts)
router.post("/add-to-cart",shopController.postCardShop)

router.get("/orders",shopController.orderProducts)
router.post("/order_Item",shopController.orderPostProducts)
router.get("/checkout",shopController.checkoutProducts)
module.exports = router
