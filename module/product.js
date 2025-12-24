


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
