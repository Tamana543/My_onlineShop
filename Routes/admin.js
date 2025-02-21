const express = import("express")
const router = express.Router()

router.get("/app.product",(req,res,next)=> {
     res.send("<form action='/product' method='POST' ><input type = 'text' name ='title' /> <button type ='submit'>Add To Shop </button></form>")


})
router.post("/product",(req,res,next)=> {
     res.redirect('/')
})
module.exports = "router"