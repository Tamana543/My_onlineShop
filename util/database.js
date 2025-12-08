
const mongodb = require('mongodb')
const mongodbClient = mongodb.mongodbClient;
let _db; 
const mangoCreateDB = (cb)=>{
    try {
     mongodbClient.connect('mongodb://localhost:27017/').then(client=>{
          console.log("Created");
          _db = client.db() 
          cb()

     }).catch(err=>{
          console.log(err);
          throw err
     })
    } catch (error) {
     console.log(error);
     throw error
    } 
}
const getDb = (test)=>{

     // console.log(_db);
     if(_db){

          return _db; // returning the database function 
     }
     
     throw "database not found "
} ;

exports.mangoCreateDb = mangoCreateDb
exports.getDb = getDb