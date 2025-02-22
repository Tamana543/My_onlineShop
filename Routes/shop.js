const path = require("path")
const express = require("express")
const router = express.Router()
router.get("/",(req,res,next)=> {
     res.sendFile(path.join(__dirname,"../","views","shop.html")) // To connect your HTML, path creates a path the join make the url, the __dirname go through all dirictoryies in your PC , ../ goes one level up .
})
module.exports = router
