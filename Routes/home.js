const path = require("path")
const express = require("express")
const router = express.Router();
const rootPath = require("../utill/path")
router.get("/home",(req,res,next)=> {
 res.render("home",{ pageTitle : "home",path:"/hom"})
})

module.exports = router;