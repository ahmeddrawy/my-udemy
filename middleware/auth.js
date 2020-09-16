const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req , res , next){
    const token = req.header('x-auth-token');
    if(!token ){
        return res.status(401).send('access denied, no token was provided');
    }
    try {
        const decoded = jwt.verify(token , config.get('jwt_private'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }

}
module.exports= auth ;