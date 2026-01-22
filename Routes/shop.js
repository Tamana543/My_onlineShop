const path = require("path")
const express = require("express")
const router = express.Router()
const shopController = require("../controller/shop")
const rootAuth = require('../middleware/is_auth')


// router.get("/",rootPath)
router.get("/shop/product_list",rootAuth,shopController.indexProducts)
// to hundle id . Remember in here when you use : it means that the app should not only go through file to find exactly product but what data had been stored to the variable named that.
router.get("/products/:productId",rootAuth,shopController.getidProduct)
router.get("/products",rootAuth,shopController.productsShop)

router.get("/cart",rootAuth,shopController.cartProducts)
router.post("/add-to-cart",rootAuth,shopController.postCardShop)
router.post('/cart-delete-item',rootAuth,shopController.deletePostProduct)

router.get("/orders",rootAuth,shopController.orderProducts)
router.post("/order_Item",rootAuth,shopController.orderPostProducts)

router.get("/checkout",rootAuth,shopController.checkoutProducts)


router.get("/order/:orderId", rootAuth,shopController.invoiceFunction)
module.exports = router
