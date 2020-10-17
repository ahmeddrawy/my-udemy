const express = require('express');
const app = express();
const winston = require('winston');
require('./startup/logging')(); /// logging is here to handle errors from routes and dbs
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
app.use(express.static('public'))
const port = process.env.PORT || 8090;
app.listen(port,()=>{
    winston.info(`listening to port ${port}`);
});