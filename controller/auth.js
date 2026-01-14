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