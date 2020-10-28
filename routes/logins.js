const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const emailRegex = /^[\w]+[\w\.]+@([\w-])+(\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
/// to login a user 

router.post('/',async (req,res)=>{
    const {error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return ;
    }
    try {
        const token = await login(req.body.email , req.body.password);
        res.send(token);
    }
    catch(err){
        res.send(err.message);
    }

});
async function login(email , password){
    let user =await User.findOne({email});
    if(!user){
        /// we dont send 404 because we dont the user to know that the email is not correct
        /// to avoid attacks like bruteforcing
       throw new Error('invalid email or password');
    }
    const validPassword = await bcrypt.compare(password , user.password);
    if(!validPassword){
        throw new Error('invalid email or password');

    }
    return user.generateAuthToken();
    
}
function validate(req){
    const schema = Joi.object({
        password:Joi.string().min(8).regex(passwordRegex),
        email:Joi.string().email()
    });
    return schema.validate(req);
}
module.exports = router ;