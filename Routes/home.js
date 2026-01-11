const path = require("path")
const express = require("express")
const router = express.Router();

router.get("/",(req,res,next)=> {
 res.render("home",{ pageTitle : "home", path:"/home",
isAuthCorrect : false})
})

module.exports = router;