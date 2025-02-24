const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const adminRouter = require("./Routes/admin")
const shapRouter = require("./Routes/shop")
const homeRouter = require("./Routes/home");
const path = require("path")


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(adminRouter)
app.use(shapRouter)
app.use(homeRouter)
app.use((req,res,next) => {
res.status(404).sendFile(path.join(__dirname,"./","views","404.html"))
})
app.listen(5430)