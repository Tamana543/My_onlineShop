const user = require('../module/user')
const validationResult = require("express-validator")
const bcrypt= require('bcrypt')

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

exports.postSignup = (req,res,next)=>{
     const email = req.body.email ;
     const password = req.body.password;
     const validated = validationResult(req)

     if(!validated.isEmpty()){
     // hundle the validation error 
     let error = validated.array()[0].msg

     console.log(error);

     return res.status(422).render("auth/signup",{
          path: '/signup',
          pageTitle : "User not found",
          isAuthCorrect : false,

     })
     }


}

exports.postLogIn = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    
    user.findOne({email: email})
    .then((user)=>{
     if(!user){
          return res.render('auth/signup',{
               path : "/signup",
               pageTitle : "User not found",
                isAuthCorrect : false,

          })
     }
    })
    .catch(err=>{
     console.log(err);
    })
}

