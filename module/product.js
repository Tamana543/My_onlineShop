const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const SchemaFirstProduct = new Scheme({
     title : {
          type: String,
          required : true
     },
     price : {
          type: Number,
          required : true
     },
     description : {
          type : String,
          required : true
     },
     imageUrl : {
          type : String,
          required : true 
     },
     userId : {
          type : Scheme.Types.ObjectId,
          ref : 'User',
          required : true
     },
     category :{
          type : String, 
          required : true
     },
     stock : {
          type: Number,
          required: true,
          default: 0
     }
     
},{timestamps: true });
SchemaFirstProduct.index({
  title: "text",
  description: "text"
});
module.exports = mongoose.model('Product',SchemaFirstProduct)
     
     
    