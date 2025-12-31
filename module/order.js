const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;

const mainOrderSchema = new Schema({
     products: [{
          product: {
               type : Object,
               required : true

          },
          quantity : {
               type : Number,
               required: true
          }
     }],
     user : [{
          name : {
               type : String,
               required :true
          },
          userId: {
               type : Schema.Types.ObjectId,
               require : true,
               ref :'User'
          }
     }]
})

module.exports = mongoose.model('Order',mainOrderSchema)