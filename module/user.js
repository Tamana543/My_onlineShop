// mongoose 
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userMainSchema = new Schema({
     email : {
          type: String,
          required : true
     },
     password : {
          type: String,
          required : true
     },
     cart : {
          items : [
               {
                    productId : {
                         ref : 'Product',
                         required : true,
                         type : Schema.Types.ObjectId
                    },
                    quantity : {
                         type : Number,
                         required : true
                    }

               }
          ]
     }
})

module.exports = mongoose.model('User',userMainSchema)