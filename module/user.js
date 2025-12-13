// const data = require('../data/products.json')
// const sequalizer  = require('sequelize')

const mongoose = require('mongoose');
const { RelationshipType } = require('sequelize/lib/errors/database/foreign-key-constraint-error');
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
     cart : {
          items : [
               {
                    productId : {
                         type : schema.Types.ObjectId,
                         require: true,
                         ref : 'Product'
                    },
                    quantity : {
                         type : Number,
                         require : true
                    }
               }
          ]
     }
})

UserSchema.methods.addToCart = function(product){
const cartProductIndex =this.cart.items.findIndex(cp => {
     return cp.productId.toString()== product._id.toString()
})

let newQuantity = 1 
const updatedCartItem = [...this.cart.items] ;

if(cartProductIndex >= 0) {
     newQuantity = this.cart.items[cartProductIndex].quantity + 1 
     updatedCartItem[cartProductIndex].quantity = newQuantity
}else {
     updatedCartItem.push (
          {
               productId : product._id,
               quantity : newQuantity
          }
     )
}
const updatedCart ={
     items :updatedCartItem
 } ;
 this.cart = updatedCart 
 return this.save()

}
UserSchema .methods.clearCart = function(){
     this.cart = {items : []}
     return this.save()
}
module.exports = mongoose.model('User',UserSchema)

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
