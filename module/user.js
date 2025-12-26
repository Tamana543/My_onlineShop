// mongoose 
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userMainSchema = new Schema({
     email : {
          type: String,
          require : true
     },
     password : {
          type: String,
          require : true
     },
     cart : {
          items : {
                    type : Array,
                    productId : {
                         ref : 'Product',
                         require : true,
                         type : Schema.Types.ObjectId
                    },
                    quantity : {
                         type : Number,
                         require : true
                    }

          }
     }
})

module.exports = mongoose.model('User',userMainSchema)