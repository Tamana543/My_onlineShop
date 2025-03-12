const fs = require("fs");
const path = require('path')

module.exports =class Products {
     constructor(t) {
          this.title = t
     }
     save() {
       const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json')
       fs.readFile(p,(err,fileContent)=>{
          console.log(fileContent);
       })
     }
     static fetchAll() {
          return products;
     }
}