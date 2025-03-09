const path = require("path")
const express = require("express")
const router = express.Router()
const shopProduct = require("../controller/products")

// router.get("/",rootPath)
router.get("/",shopProduct.productsShop)
module.exports = router
