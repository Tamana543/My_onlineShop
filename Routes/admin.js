const express = require("express")
const { title } = require("process");
const router = express.Router();
const addminController = require('../controller/admin')
const rootAuth = require('../middleware/is_auth')
const {check} = require("express-validator")

router.get("/add-product",  rootAuth ,addminController.getAddProducts);

router.get("/products",  rootAuth ,addminController.adminProducts);

router.post("/add-product", rootAuth,
     [
     check("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),

    check("imageUrl")
      .isURL()
      .withMessage("Please enter a valid image URL"),

    check("price")
      .isFloat({ min: 1 })
      .withMessage("Price must be greater than 0"),

    check("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),

    check("category")
      .notEmpty()
      .withMessage("Please select a category")
     ]
      ,addminController.postproducts)

router.get("/edit_products/:productID", rootAuth ,addminController.editGitProduct)

router.post("/edit_products", rootAuth ,addminController.editPostProduct)



// router.delete('/product/:productId', rootAuth ,addminController.deleteProduct)
router.delete('/delete-product/:productId', addminController.deleteProduct);

module.exports = router;
