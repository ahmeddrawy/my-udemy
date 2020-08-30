const express = require('express');
const app = express();
const Joi = require('joi'); //return class

const courses = require('./routes/courses');
const genres = require('./routes/genres');

// const config = require('config');

/// ============= config ============
// console.log(`app name ${config.get('DEBUG')}`);
app.use(express.json());
///============= routes =============
app.use('/api/courses',courses);
app.use('/api/genres',genres);

app.get('/',(req ,res)=>{
    res.send('hello world');
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});