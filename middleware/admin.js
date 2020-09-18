module.exports = function (req, res , next){
    if(!req.user.isAdmin) {
        ///401 unauthorized
        ///403 forbidden
        return res.status(403).send('Access denied.');
    }
    next();
}