const user = require('../module/user')
const emailTemplateEng = require('../module/emailTemp')
const {validationResult} = require("express-validator")
const bcrypt= require('bcrypt')
const nodemailer = require("nodemailer")
const { ValidationError } = require('sequelize')

// gmail SMTP 

const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465, 
  secure : true,
  auth : {
     user : "tamanafarzami33@gmail.com",
    pass: "fdyk inej sqez xtnd"
  }
})
exports.getLogIn = (req,res,next)=>{
     let errorMessage = req.flash('userError')
     if(errorMessage.length > 0 ){
          errorMessage = errorMessage
     }else {
          errorMessage = null
     }
     res.render('auth/login',{
          pageTitle :"Login page",
          path : '/login',
           isAuthCorrect : false,
           errorMessage : errorMessage,
           ValidationError : []
     })
}

exports.getSignUp = (req,res,next)=>{
     let errorMessage = req.flash('userError'); //store temporary messages  in the session and display them after a redirect.

     if(errorMessage.length > 0) {
          errorMessage = errorMessage
     }else {
          errorMessage = null
     }

      res.render('auth/signup',{
          pageTitle :"signup page",
          path : '/signup',
          isAuthCorrect : false,
          errorMessage : errorMessage,
          ValidationError : []
          
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
          pageTitle : "Signup",
          isAuthCorrect : false,
          errorMessage : error,
          ValidationError : validated.array()

     })
     }
     const emailTemplate = emailTemplateEng(' Welcome to Our Shop!', 'We are thrilled to have you join our community! Your account has been successfully created.', email, 'Start Shopping'); 

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
      html : emailTemplate,
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

