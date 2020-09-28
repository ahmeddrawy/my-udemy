const express = require('express');
const app = express();
const Joi = require('joi'); //return class
const mongoose = require('mongoose');
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
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
// throw new Error('un caught exception');
const p = Promise.reject(new Error('unfullfilled promise'));
p.then(()=>console.log('done'));
/// routes
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const users = require('./routes/users');
const logins = require('./routes/logins');

///middlewares
const err_middleware = require('./middleware/error');

// config
if(!config.get('jwt_private')){
    console.error('Fatal error: jwt_private is not defined !!');
    process.exit(1);
}
//======== db setup ================
mongoose.connect(db_URI)
.then(()=>console.log('connected to mongodb'))
.catch((err)=>console.log(`can't connect` , err.message));

app.use(express.json());
///============= routes =============
app.use('/api/courses',courses);
app.use('/api/genres',genres);
app.use('/api/users',users);
app.use('/api/logins',logins);

// middlewares
app.use(err_middleware);

app.get('/',(req ,res)=>{
    res.send('hello world');
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});