const express = require('express');
const app = express();
const Joi = require('joi'); //return class
const mongoose = require('mongoose');

const courses = require('./routes/courses');
const genres = require('./routes/genres');
const users = require('./routes/users');
const logins = require('./routes/logins');

//======== db setup ================
const URI = 'mongodb://localhost:27017/MyUdemy';
mongoose.connect(URI)
.then(()=>console.log('connected to mongodb'))
.catch((err)=>console.log(`can't connect` , err.message));
//====================
// const config = require('config');

/// ============= config ============
// console.log(`app name ${config.get('DEBUG')}`);
app.use(express.json());
///============= routes =============
app.use('/api/courses',courses);
app.use('/api/genres',genres);
app.use('/api/users',users);
app.use('/api/logins',logins);


app.get('/',(req ,res)=>{
    res.send('hello world');
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});