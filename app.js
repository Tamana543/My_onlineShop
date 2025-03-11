const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const adminRoute = require("./Routes/admin")
const shapRouter = require("./Routes/shop")
const homeRouter = require("./Routes/home");
const path = require("path")
// const expressHandlebar = require('express-handlebars'); un commit this if you like to use handlebar
app.set('views','views') // find the dinamic data from here (vidit expres.set fot more )
// debugger;
app.use("/app.product",adminRoute)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))
// app.engine('hbs',expressHandlebar())
app.set('view engine' , 'ejs') // to tell the express go and ramder the pug dinamic data ( compile it )
// app.set('view engine' , 'hbs') // to tell the express go and ramder the handlebar (search about it) dinamic data ( compile it )
app.use(shapRouter)
app.use(homeRouter)
app.use((req,res,next) => {
res.status(404).render('404',{pageTitle: 'Page Not Found'})
})
app.listen(5430)