const path = require("path")
const express = require("express")
const router = express.Router();
const rootAuth = require('../middleware/is_auth')

router.get("/",rootAuth,(req,res,next)=> {
 res.render("home",{ pageTitle : "home", path:"/home",})
})

module.exports = router;