const mongoose = require('mongoose');
const db_URI = 'mongodb://localhost:27017/MyUdemy';
module.exports = function (){
    //======== db setup ================
    mongoose.connect(db_URI)
    .then(()=>console.log('connected to mongodb'))
    .catch((err)=>console.log(`can't connect` , err.message));
}