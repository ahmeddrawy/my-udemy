const express = require('express');
const router = express.Router();
const {User , validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
/// to reqister a user 
router.post('/',async (req,res)=>{
    const {error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return ;
    }
    let user = new User(_.pick(req.body, ['name','email','password']));
    try {
        const salt =await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password,salt);
        user = await user.save();
        user=  _.pick(user,['name','email']);
        res.send(user);
    }
    catch(err){
        res.send(err.message);
    }

});
module.exports = router ;