const express = require('express');
const router = express.Router();
const {User , validate} = require('../models/user');
const _ = require('lodash');
const crypto=require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { route } = require('./logins');
// get current user 
router.get('/me',auth, async(req,res)=>{
    const id  = req.user._id;
    const user = await User.findById(id).select('-password').select('-__v'); /// excluding password
    res.send(user);
})
/// to reqister a user 
router.post('/',async (req,res)=>{
    const {error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return ;
    }
    let user = new User(_.pick(req.body, ['name','email','password']));
    try {
        const token = user.generateAuthToken();
        user = await user.save();
        user=  _.pick(user,['name','email']);
        res.header('x-auth-token',token).send(user);
    }
    catch(err){
        res.send('error in registering '+err.message);
    }

});
router.post('/forgetPassword',async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).json({
            status:'error',
            message:'Email is not valid'
        })
        return;
    }
    const resetToken=user.createPasswordResetToken();
    await user.save({validateBeforeSave:false})
    try{
        const resetLink=`${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
        res.status(200).json({
            status:'success',
            message:'mail send Sucessfully',
            resetLink
        })
    }catch(err){
        user.passwordResetToken=undefined;
        await user.save({validateBeforeSave:false})
        next(new AppError('failed to send the Email',500));
    }
})

router.patch('/resetPassword/:resetToken',async (req,res)=>{
    const encryptPasswordResetToken=crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const user=await User.findOne({passwordResetToken:encryptPasswordResetToken})
    if(!user){
        res.status(400).json({
            status:'error',
            message:'Link is Not Valid',
        })
        return ;
    }
    user.password=req.body.password;
    user.passwordResetToken=undefined;
    await user.save();
    res.status(200).json({
        status:'success',
        message:'Password changed sucessfull'
    })
})
module.exports = router ;