const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const emailRegex = /^[\w]+[\w\.]+@([\w-])+(\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
/// to reqister a user 
router.post('/',async (req,res)=>{
    const {error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return ;
    }
    try {
        let user =await User.findOne({email:req.body.email});
        if(!user){
            /// we dont send 404 because we dont the user to know that the email is not correct
            /// to avoid attacks like bruteforcing
            return res.status(400).send('invalid email or password');
        }
        const validPassword = await bcrypt.compare(req.body.password , user.password);
        console.log(validPassword);
        if(!validPassword){
            return res.status(400).send('invalid email or password');
        }

        res.send(true);
    }
    catch(err){
        res.send(err.message);
    }

});
function validate(req){
    const schema = Joi.object({
        password:Joi.string().min(8).regex(passwordRegex),
        email:Joi.string().email()
    });
    return schema.validate(req);
}
module.exports = router ;