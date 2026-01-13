const authController = require('../controller/auth')
const express = require('express')
const router = express.Router();
const User = require('../module/user')


router.get('/login',authController.getLogIn)
router.get('/signup',authController.getSignUp)

module.exports = router