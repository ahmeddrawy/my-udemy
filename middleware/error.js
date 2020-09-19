module.exports = function (err, req,res ,next){
    /// log the error 
    res.status(500).send('internal error')
}