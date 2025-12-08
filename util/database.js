
const mongodb = require('mongodb')
const mongodbClient = mongodb.mongodbClient;
let _db; 
const mangoCreateDB = (cb)=>{
    try {
     mongodbClient.connect('mongodb://localhost:27017/')
    } catch (error) {
     console.log(error);
     throw error
    } 
}