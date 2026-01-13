const user = require('../module/user')

exports.getLogIn = (req,res,next)=>{
     res.render('auth/login',{
          pageTitle :"Login page",
          path : '/login',
           isAuthCorrect : false
     })
}

exports.getSignUp = (req,res,next)=>{
      res.render('auth/signup',{
          pageTitle :"Login page",
          path : '/signup',
           isAuthCorrect : false
     })
}