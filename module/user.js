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
     resetToken : String,
     resetExpiredToken : Date,
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
     wishlist: {
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ]
}
     
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
          items : userUpdatedCartItems
     };
     
     // assigning the updated cart to the care 
     this.cart = userUpdatedCart;

     return this.save()
}
userMainSchema.methods.deleteItemCard = function(prod_id){

  this.cart.items = this.cart.items.filter(item => {
    const itemId =
      item.productId._id
        ? item.productId._id.toString()
        : item.productId.toString();

    return itemId !== prod_id.toString();
  });

  return this.save();


}
userMainSchema.methods.addToWishList = function(product){
     const exists = this.wishlist.items.find(item=>{
          return item.productId.toString() === product._id.toString()
     })

     if(exists) {
          return Promise.resolve(this)
     }
this.wishlist.items.push({productId : product._id})
return this.save()
}
userMainSchema.methods.removeFromWishlist = function(prodId) {
  this.wishlist.items = this.wishlist.items.filter(item => {
    return item.productId.toString() !== prodId.toString();
  });

  return this.save();
};
module.exports = mongoose.model('User',userMainSchema)