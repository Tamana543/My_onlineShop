const { json } = require("body-parser");
const fs = require("fs");
const path = require('path')

module.exports =class Products {
     constructor(t) {
          this.title = t
     }
     save() {
       const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json')
       fs.readFile(p,(err,fileContent)=>{
          // console.log(fileContent);
          let products = [];
          if(!err) {
               products = JSON.parse(fileContent)
          }
          products.push(this)
          fs.writeFile(p, JSON.stringify(products),(err)=>{
               console.log(err);
          })
       })
     }
     static fetchAll(cb) {
          const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json')
          fs.readFile(p,(err,fileContent)=>{
               if(err){
                    // return [];
                    cb([]);
               }
               // return JSON.parse(fileContent)
               cb(JSON.parse(fileContent))
               // rememeber it is a synchrouus function and the fetchAll function returns undifined. solution : rgive the function an parameter and call the function just by the parameter .
          })
     }
}