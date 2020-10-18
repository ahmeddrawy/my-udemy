const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');
const crypto =require('crypto');
const jwt = require('jsonwebtoken');
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
    },
    isAdmin:{
        type : Boolean,
        default:false 
    },
    passwordResetToken:String,
    
})
schema.pre('save',async function(next){
    if(!this.isModified('password')) next();
    const salt =await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
schema.methods.correctPassword =async function(candidatePassword,password){
    return await bcrypt.compare(candidatePassword,password)
}

// This methode is used for ResetPassword Router
// resetToken :- generated a random token from crypto lib
// Encrypted that token and save that token in to mongoDb
// The random genarated String Send to the client.
schema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    return resetToken;
}
schema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin : this.isAdmin},config.get('jwt_private'));
    return token ;

}
function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        password:Joi.string().min(8).regex(passwordRegex),
        email:Joi.string().regex(emailRegex)
    });
    return schema.validate(user);
}
function validatePassword(user){
    const schema = Joi.object({
        password:Joi.string().min(8).regex(passwordRegex)
    });
    return schema.validate(user);
}
schema.set('toObject', { getters: true });
schema.set('toJSON', { getters: true });
const User = mongoose.model('user' ,schema);
module.exports= {
    User :User ,
    validate : validateUser,
    validatePassword
}