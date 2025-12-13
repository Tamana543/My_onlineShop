// const data = require('../data/products.json')
// const sequalizer  = require('sequelize')

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
     email: {
          type : String,
          require: true
     }
     ,
     password : {
          type : String,
          require : true
     }, 
     cart : []
})

// const User =  sequalizer.define('userProduct',{
//      id : {
//           type : sequalizer.INTEGER,
//           autoIncrement : true, 
//           allowNull : false,
//           primaryKey : true
//      }, 
//      name : sequalizer.STRING,
//      email : {
//           type : sequalizer.STRING,
//           allowNull : false
//      }
// })
