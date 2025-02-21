const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const adminRouter = require("./Routes/admin")
const shapRouter = require("./Routes/shop")



app.use(bodyParser.urlencoded({extended: false}))
app.use(adminRouter)
app.use(shapRouter)
app.listen(5430)