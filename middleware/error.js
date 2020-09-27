const winston = require('winston');
module.exports = function (err, req,res ,next){
    /// log the error 
    winston.error(err.message,err)
    res.status(500).send('sorry we have an internal error')
}