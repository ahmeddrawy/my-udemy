const express = require('express');
const app = express();
const config = require('config');
require('./startup/logging')(); /// logging is here to handle errors from routes and dbs
require('./startup/routes')(app);
require('./startup/db')();
// config
if(!config.get('jwt_private')){
    console.error('Fatal error: jwt_private is not defined !!');
    process.exit(1);
}

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});