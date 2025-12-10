const express = require("express")
const bodyParser = require("body-parser")
const session = require('express-session')
const mongostoreSession = require('connect-mongodb-session')(session)

const adminRoute = require("./Routes/admin")
const shapRouter = require("./Routes/shop")
const homeRouter = require("./Routes/home");
const path = require("path")
const { Collection } = require("mongodb")
const app = express()
// const expressHandlebar = require('express-handlebars'); un commit this if you like to use handlebar
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views') // find the dinamic data from here (vidit expres.set fot more )
// debugger;
app.use("/admin",adminRoute)

// app.engine('hbs',expressHandlebar())
app.set('view engine' , 'ejs') // to tell the express go and ramder the pug dinamic data ( compile it )
// app.set('view engine' , 'hbs') // to tell the express go and ramder the handlebar (search about it) dinamic data ( compile it )
app.use(shapRouter)
app.use(homeRouter)
// database : Mongoo
const MONGOD_URL  =  '';
const store = new mongostoreSession({
     uri : MONGOD_URL,
     Collection : 'sessions'
})
app.use((req,res,next) => {
res.status(404).render('404',{pageTitle: 'Page Not Found'})
})
app.listen(3000)