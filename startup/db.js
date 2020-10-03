const mongoose = require('mongoose');
const winston = require('winston');
const db_URI = 'mongodb://localhost:27017/MyUdemy';
module.exports = function (){
    //======== db setup ================
    mongoose.connect(db_URI,{ useUnifiedTopology: true , useNewUrlParser: true})
    .then(()=>winston.info('connected to mongodb'));
    /// we don't need to catch the error the error will be catched from process.on in app.js
}