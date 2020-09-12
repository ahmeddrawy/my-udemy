const mongoose = require('mongoose');
const Joi = require('joi');
const emailRegex = /^[\w]+[\w\.]+@([\w-])+(\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const schema= new mongoose.Schema({
    name :{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
    },
    password : {
        type:String,
        match:passwordRegex
    },
    email:{
        type:String,
        match:emailRegex,
        unique:true
    }
})
const User = mongoose.model('user' ,schema);
function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        password:Joi.string().min(8).regex(passwordRegex),
        email:Joi.string().regex(emailRegex)
    })
}
module.exports= {
    User :User ,
    validate : validateUser
}