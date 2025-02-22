const path = require("path")
const express = require("express")
const router = express.Router();

router.get("/app.product",(req,res,next)=> {
 res.sendFile(path.join(__dirname,"../","views","addProduct.html"))
})
router.post("/product",(req,res,next)=> {
     res.redirect('/')
})
module.exports = router;