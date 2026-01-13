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
          pageTitle :"signup page",
          path : '/signup',
           isAuthCorrect : false
     })
}

exports.getReset = (req,res,next)=>{
         res.render('auth/resetPassword',{
          pageTitle :"Reset Password page",
          path : '/login',
           isAuthCorrect : false
     })
}