const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
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
        match:passwordRegex,
        set:async function(v){
            const salt =await bcrypt.genSalt(10);
            console.log(v);
            try {
                const hashed =  await bcrypt.hash(v,salt);
                console.log(hashed);
                return hashed;
                
            } catch (error) {
                console.log('error in setting password',error.message);
            }
        }
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
    });
    return schema.validate(user);
}
schema.set('toObject', { getters: true });
schema.set('toJSON', { getters: true });

module.exports= {
    User :User ,
    validate : validateUser
}