const express = require('express');
const app = express();
const Joi = require('joi'); //return class
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
require('./startup/routes')(app);
require('./startup/db')();
process.on('uncaughtException',(exc)=>{
    winston.error(exc.message,exc);
    console.log('we faced an internal error');
    // process.exit(1);
});
const db_URI = 'mongodb://localhost:27017/MyUdemy';
/// to log errors in files
winston.add(new winston.transports.File({filename:'logfile.log'}));
/// to log errors in mongodb 
winston.add(new winston.transports.MongoDB({db:db_URI}));

process.on('unhandledRejection' ,(exc)=>{
    winston.error(exc.message,exc);
    /// todo we should terminate here but process.exit doesn't wait for the logging process
    /// we must wait for the streams to flush 
});
// config
if(!config.get('jwt_private')){
    console.error('Fatal error: jwt_private is not defined !!');
    process.exit(1);
}

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});