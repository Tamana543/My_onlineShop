const express = require("express")
const bodyParser = require("body-parser")
const session = require('express-session')
const mongostoreSession = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
const flash = require('connect-flash')
const User = require("./module/user")
const adminRoute = require("./Routes/admin")
const shapRouter = require("./Routes/shop")
const homeRouter = require("./Routes/home");
const authRoutes = require("./Routes/auth")
const path = require("path")
const { Collection } = require("mongodb")
const app = express()

// database : Mongoo : VpUGVuzoovqhnuRo
// const MONGOD_URL  =  'mongodb+srv://car_Online-Shop:VpUGVuzoovqhnuRo@cluster0.ufecoqb.mongodb.net/?appName=Cluster0';
const MONGOD_URL = 'mongodb+srv://car_Online-Shop:VpUGVuzoovqhnuRo@cluster0.ufecoqb.mongodb.net/online_shop?retryWrites=true&w=majority';
const store = new mongostoreSession({
  uri : MONGOD_URL,
  collection : 'sessions'
})

// const expressHandlebar = require('express-handlebars'); un commit this if you like to use handlebar
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')))
app.set('views','views') // find the dinamic data from here (vidit expres.set fot more )


// app.engine('hbs',expressHandlebar())
app.set('view engine' , 'ejs') // to tell the express go and ramder the pug dinamic data ( compile it )
// app.set('view engine' , 'hbs') // to tell the express go and ramder the handlebar (search about it) dinamic data ( compile it )

app.use(session({
  secret : 'My first Car Online Shop',
  resave : false, 
  saveUninitialized : false,
  store : store
}))
app.use(flash())

app.use((req,res,next)=>{
     res.locals.isAuthCorrect = req.session.isLoggedin;
    
     next()
})
// app.use((req,res,next)=>{
//      User.findOne().then(user=>{
//           console.log(user);
//           req.user = user
//           next()
//      }).catch(err=>{
//           console.log(err);
//      })
// });
app.use((req, res, next) => {
    if (!req.session.user) {
      console.log("Meeee")
      return next();
    }
  // console.log(req.session.user._id)
  User.findById(req.session.user._id)
      .then(user => {
        console.log("req.user: ",req.user)
        console.log("User: ",user)
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
});



app.use("/admin",adminRoute)

app.use(shapRouter)
app.use(authRoutes)
app.use(homeRouter)


// debugger;
// app.use((req, res, next) => {
//   console.log('SESSION:', req.session);
//   next();
// });

// storing through all the program, running one only during the each server run 





app.use((req,res,next) => {
res.status(404).render('404',{pageTitle: 'Page Not Found'})
})


mongoose.connect(MONGOD_URL).then(result=>{
  app.listen(3000)
}
).catch(err=> console.log(err))



// mangoCreateDb(()=>{
//      app.listen(3000)
// })