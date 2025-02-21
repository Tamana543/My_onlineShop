const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const adminRouter = require("./Routes/admin")
const shapRouter = require("./Routes/shop")



app.use(bodyParser.urlencoded({extended: false}))
app.use(adminRouter)
app.use(shapRouter)

app.use((req,res,next) => {
res.status(404).send("<h1>OOps Link Not Fund!</h1>")
})
app.listen(5430)