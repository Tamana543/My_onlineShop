const user = require('../module/user')
const {validationResult} = require("express-validator")
const bcrypt= require('bcrypt')
const nodemailer = require("nodemailer")


// gmail SMTP 

const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465, 
  secure : true,
  auth : {
     user : "tamanafarzami33@gmail.com",
    pass: "hyrf bbal uqjk qyjg"
  }
})
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
     // console.log("Password : ",password);
     // console.log("Email : ",email);
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

     bcrypt.hash(password,12).then((hashedPassword)=>{
          req.session.isLoggedin = true 
          const newUser = new user({
               email : email,
               password : hashedPassword,
               card : {item :[]}
          })
          return newUser.save()
     }).then(result=>{
          const sender = {
               address : "Tamanafarzami33@gmail.com",
               name : "Tamana Farzami "
          }
         const recipients = email
    transport.sendMail({
      from: sender,
      to:recipients,
      subject: "SIGN UP Completed Successfully :)",
      text : "Congratulation, your account has been successfully authorized!",
        category: "Integration Test",
    }).then((respond)=>console.log(respond))
    .catch(err=>{
      next(new Error(err))
    })
    res.redirect('/login')
     })
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

