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
     },
     
})
userMainSchema.methods.addToCart = function(product){
     // get the index of the product if it already exist
     const productIndex = this.cart.items.findIndex(cb=>{
          return cb.productId.toString()== product._id.toString()
     }) ;
     let productNewQuantity = 1 
     const userUpdatedCartItems = [...this.cart.items]
     
     // check if product already exist or not 
     if(productIndex >= 0) {
         productNewQuantity = this.cart.items[productIndex].quantity + 1;
         userUpdatedCartItems[productIndex].quantity = productNewQuantity
     }else {
          userUpdatedCartItems.push({
               productId : product._id,
               quantity : productNewQuantity
          })
     }
     
     //updateing cart
     const userUpdatedCart = {
          item : userUpdatedCartItems
     };
     
     // assigning the updated cart to the care 
     this.cart = userUpdatedCart;

     return this.save()
}
module.exports = mongoose.model('User',userMainSchema)