const express = require('express')
const {check,body} = require('express-validator')
const router = express.Router();
const authController = require('../controller/auth')
const User = require('../module/user')

router.get('/login',authController.getLogIn)
router.get('/signup',authController.getSignUp)
router.get('/reset',authController.getSignUp)


router.post('/login',[
 check('email').isEmail().withMessage("Incorrect Email ")
], authController.postLogIn)

router.post('/signup',[
   check('email')
   .isEmail().withMessage("Please enter a valid email address ! ").normalizeEmail().custom((email,{req})=>{
   User.findOne({email: email}).then(userDoc =>{
     if(userDoc){
          return Promise.reject("User already exist, try login ! ")
     }

   })
   }) ,
   body('password').isStrongPassword({
     minLength : 6,
     minLowercase : 1 , 
     minNumbers : 1 ,
     minUppercase : 1 ,
     minSymbols : 1
   }) .withMessage("Password must be at least 5 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.").trim(),body('confirmPassword').trim().custom((value,{req})=>{
     if(value !== req.body.password){
          throw new Error("Password should match ! ")
     }
     return true
   })
],authController.postSignup)

module.exports = router