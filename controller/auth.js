const user = require('../module/user')
const emailTemplateEng = require('../module/emailTemp')
const {validationResult} = require("express-validator")
const crypto = require('crypto')
const bcreypt= require('bcrypt')
const axios = require("axios");
const { ValidationError } = require('sequelize')


// gmail Email API
console.log(process.env.BREVO_API_KEY);
// port 465 in render makes problem so switched to this. 
const sendEmail = async (to, subject, htmlContent) => {
     try {
          const response = await axios.post(
               "https://api.brevo.com/v3/smtp/email",
               {
                    sender: {
                         name: "Tamana Farzami",
                         email: "tamanafarzami33@gmail.com"
                    },
                    to: [
                         {
                              email: to
                         }
                    ],
                    subject: subject,
                    htmlContent: htmlContent
               },
               {
                    headers: {
                         "api-key": process.env.BREVO_API_KEY,
                         "Content-Type": "application/json"
                    }
               }
          );
          console.log("EMAIL SENT:", response.data);
     } catch(err) {
          console.log("BREVO API ERROR:", err.response?.data || err.message);
          throw err;
     }
}
exports.getLogIn = (req,res,next)=>{
     let errorMessage = req.flash('userError')
     const toast = req.session.toast;
     req.session.toast = null;
     if(errorMessage.length > 0 ){
          errorMessage = errorMessage
     }else {
          errorMessage = null
     }
     res.render('auth/login',{
          pageTitle :"Login page",
          path : '/login',
           isAuthCorrect: false,
           errorMessage : errorMessage,
           ValidationError : [],
           toast: toast
     })
}

exports.getSignUp = (req,res,next)=>{
     let errorMessage = req.flash('userError'); //store temporary messages  in the session and display them after a redirect.
const toast = req.session.toast;
req.session.toast = null;
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
          ValidationError : [],
          toast: toast
          
     })
}

exports.getReset = (req,res,next)=>{
     let errorMessage = req.flash('error')
     const toast = req.session.toast;
     req.session.toast = null;
     if(errorMessage.length > 0){
          errorMessage = errorMessage
     }else {
          errorMessage = null
          
     }
         res.render('auth/resetPassword',{
          pageTitle :"Reset Password page",
          path : '/login',
          errorMessage : errorMessage,
          toast: toast
                })
}

exports.getNewPassword = (req,res,next)=>{
const token = req.params.token;
user.findOne({resetToken : token , resetExpiredToken : {$gt : Date.now()}})
.then(user =>{
     let errorMessage = req.flash('passwordRepeated')
     if(errorMessage.length > 0){
          errorMessage = errorMessage
     }else {
          errorMessage = null
     }
     if (!user) {
    req.flash('error', 'Token is invalid or expired')
    return res.redirect('/reset')
  }

     res.render('auth/newPassword',{
          path : '/newPassword',
          pageTitle : 'New Password',
          isAuthCorrect : false,
          errorMessage : errorMessage,
          userId : user._id.toString(),
          passwordToken : token
          
     })
}).catch(err=>{
     console.log(err)
})
}

exports.postSignup = async (req,res,next) => {
     try {
          const email = req.body.email;
          const password = req.body.password;
          const validated = validationResult(req);
          if(!validated.isEmpty()){

               let error = validated.array()[0].msg;

               return res.status(422).render("auth/signup",{
                    path: '/signup',
                    pageTitle : "Signup",
                    isAuthCorrect : false,
                    errorMessage : error,
                    ValidationError : validated.array()
               });
          }
          const hashedPassword = await bcreypt.hash(password,12);
          const newUser = new user({
               email : email,
               password : hashedPassword,
               cart : {items :[]}
          });
          const savedUser = await newUser.save();
          req.session.isLoggedin = true;
          req.session.user = {
               _id: savedUser._id.toString()
          };
          const homeLink = process.env.BASE_URL;
          const emailTemplate = emailTemplateEng(
               'Welcome to Our Shop!',
               'We are thrilled to have you join our community!',
               'You can now start browsing our latest collections.',
               email,
               homeLink,
               'Start Shopping'
          );
          await sendEmail(
               email,
               "SIGN UP Completed Successfully :)",
               emailTemplate
          );
          console.log("EMAIL SENT SUCCESSFULLY");
          req.session.toast = {
               message: "Account created successfully",
               type: "success"
          };
          req.session.save(err => {
               if(err){
                    console.log(err);
               }
               res.redirect('/login');
          });
     } catch(err){
          console.log("SIGNUP ERROR:", err);
          req.session.toast = {
               message: "Failed to create account",
               type: "error"
          };
          res.redirect('/signup');
     }
}

exports.postLogIn = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password

    user.findOne({email: email})
    .then((user)=>{
     if(!user){
          return res.render('auth/login',{
               path : "/login",
               pageTitle : "Login",
                 isAuthCorrect : false,
                errorMessage : "Incorrect Password or Email Try again",
                ValidationError : [{path : 'email', path : 'Password'}]

          })
     }
return bcreypt.compare(password, user.password).then(isMatching=>{
if(isMatching){

     req.session.isLoggedin = true
     req.session.user = {
  _id: user._id.toString()
};
// Cart user and Guest 
const sessionCart = req.session.cart || [];

const cartPromises = sessionCart.map(item => {

     return Products.findById(item.productId)
     .then(product => {

          if(!product) return;

          let chain = Promise.resolve();

          for(let i = 0; i < item.quantity; i++){
               chain = chain.then(() => user.addToCart(product));
          }

          return chain;
     });
});

return Promise.all(cartPromises)
.then(() => {

     req.session.cart = [];

     req.session.toast = {
          message: "Logged in successfully",
          type: "success"
     };

     return req.session.save(err => {
          res.redirect('/');
     });
});

req.session.toast = {
     message: "Logged in successfully ",
     type: "success"
};
     return req.session.save((err)=>{
          res.redirect('/')
     })

}else{
     return res.render('auth/login',{
      path : "/login",
               pageTitle : "Login",
                 isAuthCorrect : false,
                errorMessage : "Incorrect Password Try again",
                ValidationError : [{path : 'email', path : 'Password'}]
})
}
 }).catch(err=>{
     console.log(err);
})
    })
    .catch(err=>{
     console.log(err);
    })
}
exports.postLogOut = (req,res,next)=>{
req.session.destroy(err=>{
     if(err) console.log(err);
     
     res.clearCookie('connect.sid');
    res.redirect('/')
})
}

exports.postReset = (req,res,next)=>{
     const email = req.body.email;
     crypto.randomBytes(32,(error,buffer)=>{
          if(error){
               return res.redirect('/reset');
          }
          const token = buffer.toString('hex');
          user.findOne({email : email})
          .then(userFound=>{

               if(!userFound){
                    req.flash('error','Email Address not found !');
                    return res.redirect('/reset');
               }

               userFound.resetToken = token;
               userFound.resetExpiredToken = Date.now() + 3600000;

               return userFound.save();
          })
          .then(userSaved=>{

               if(!userSaved){
                    return;
               }

               const resetLink = `${process.env.BASE_URL}/reset/${token}`;

               const emailTemplate = emailTemplateEng(
                    'Password Reset',
                    'Click the button below to reset your password.',
                    'Reset your password securely',
                    email,
                    resetLink,
                    'Reset Password'
               );

               const sender = {
                    address : "Tamanafarzami33@gmail.com",
                    name : "Tamana Farzami "
               };
               return sendEmail(
                    email,
                    "Reset Password",
                    emailTemplate
               );

          })
          .then(()=>{

               req.session.toast = {
                    message: "Reset email sent successfully",
                    type: "success"
               };

               res.redirect('/login');

          })
          .catch(err=>{
               console.log(err);

               req.session.toast = {
                    message: "Failed to send reset email",
                    type: "error"
               };

               res.redirect('/reset');
          });

     });
}
exports.postNewPassword = (req,res,next)=>{
const newPassword = req.body.password;
const UserId = req.body.userId;
const newToken = req.body.passwordToken;
let resetUser;

user.findOne({resetToken : newToken, resetExpiredToken : {$gt : Date.now()}, _id : UserId})
.then(userIn =>{
if(!userIn){
     req.flash('error','User not found')
}
resetUser = userIn
return bcreypt.hash(newPassword, 12)
})
.then(hashedPassword=>{
resetUser.password = hashedPassword;
resetUser.resetToken = undefined;
resetUser.resetExpiredToken = undefined;
return resetUser.save()
})
.then(respond=>{
     req.session.toast = {
       message: "Password updated successfully ",
     type: "success"
};
     res.redirect('/login')
}).catch(err=>{
     console.log(err);
})

}