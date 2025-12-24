const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const SchemaFirstProduct = new Scheme({
     title : {
          type: String,
          require : true
     },
     price : {
          type: Number,
          require : true
     },
     description : {
          type : String,
          require : true
     },
     imageUrl : {
          type : String,
          require : true
     },
     productId : {
          type : Scheme.Types.ObjectId,
          ref : 'User',
          require: true
     }
});
module.exports = mongoose.model('Product',SchemaFirstProduct)


/**
 
const { json } = require("body-parser");
const fs = require("fs");
const path = require('path')
const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json')
const getProductsFromFile =cb => {
    fs.readFile(p,(err,fileContent)=>{
          if (err) {
              return cb([]);
          }
          try {
               
               cb(JSON.parse(fileContent));
          } catch (error) {
               console.log("Error Here :", error);
               cb([])
          }
    })
}
module.exports =class Products {
     constructor(title,imageURL,description , price, ) {
          this.title = title,
          this.imageURL = imageURL,
          this.price = price,
          this.description = description
     }
     save() {
          this.id = Math.random().toString();
       getProductsFromFile(product => {

            product.push(this)
            fs.writeFile(p, JSON.stringify(product),(err)=>{
                 console.log(err);
            })
          })
     }
     static findById(id,cb) {
        getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id)
          cb(product)
        })
     }
     static fetchAll(cb) {
        getProductsFromFile(cb)
          
     }
}

 */
