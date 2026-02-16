const express = require("express")
const { title } = require("process");
const router = express.Router();
const addminController = require('../controller/admin')
const rootAuth = require('../middleware/is_auth')

router.get("/add-product",  rootAuth ,addminController.getAddProducts);

router.get("/products",  rootAuth ,addminController.adminProducts);

router.post("/add-product", rootAuth ,addminController.postproducts)

router.get("/edit_products/:productID", rootAuth ,addminController.editGitProduct)

router.post("/edit_products", rootAuth ,addminController.editPostProduct)



// router.delete('/product/:productId', rootAuth ,addminController.deleteProduct)
router.delete('/delete-product/:productId', addminController.deleteProduct);

module.exports = router;
// exports.routs = router;
// exports.products = products;