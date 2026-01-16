const user = require('../module/user')
const emailTemplate = require('../module/emailTemp')
const {validationResult} = require("express-validator")
const bcrypt= require('bcrypt')
const nodemailer = require("nodemailer")

// gmail SMTP 
const emailTemplate2 = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #af8931; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Our Shop!</h1>
    </div>
    
    <div style="padding: 30px;">
        <h2 style="color: #af8931;">Hello there,</h2>
        <p style="font-size: 16px;">We are thrilled to have you join our community! Your account has been successfully created.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #af8931; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Account Details:</p>
            <p style="margin: 5px 0;">Username: Your Email Address</p>
            <p style="margin: 5px 0;">Status: <span style="color: #28a745;">Active</span></p>
        </div>

        <p style="font-size: 16px;">You can now start browsing our latest collections and enjoy exclusive member discounts.</p>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="http://yourdomain.com/login" style="background-color: #af8931; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Start Shopping</a>
        </div>
    </div>

    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 5px 0;">&copy; 2024 OnlineShop. All rights reserved.</p>
        <p style="margin: 5px 0;">If you did not sign up for this account, please ignore this email.</p>
    </div>
</div>
`;
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

