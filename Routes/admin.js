const path = require("path")
const express = require("express")
const router = express.Router();
const rootPath = require("../utill/path")
router.get("/app.product",(req,res,next)=> {
 res.sendFile(path.join(rootPath,"views","addProduct.html"))
})
router.post("/product",(req,res,next)=> {
     res.redirect('/')
})
module.exports = router;