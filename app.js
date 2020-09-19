const express = require('express');
const app = express();
const Joi = require('joi'); //return class
const mongoose = require('mongoose');

/// routes
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const users = require('./routes/users');
const logins = require('./routes/logins');

///middlewares
const err_middleware = require('./middleware/error');

//======== db setup ================
const URI = 'mongodb://localhost:27017/MyUdemy';
mongoose.connect(URI)
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