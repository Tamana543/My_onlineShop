const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const adminRouter = require("./Routes/admin")


app.use(bodyParser.urlencoded({extended: false}))
app.use(adminRouter)
app.listen(5430)