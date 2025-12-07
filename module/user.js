const data = require('../data/products.json')
const sequalizer  = require('sequelize')

const User =  sequalizer.define('userProduct',{
     id : {
          type : sequalizer.INTEGER,
          autoIncrement : true, 
          allowNull : false,
          primaryKey : true
     }, 
     name : sequalizer.STRING,
     email : {
          type : sequalizer.STRING,
          allowNull : false
     }
})