const path = require("path")
const express = require("express")
const router = express.Router();
const rootPath = require("../utill/path")
router.get("/home",(req,res,next)=> {
 res.sendFile(path.join(rootPath,"views","home.html"))
})

module.exports = router;