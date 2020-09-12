const express = require('express');
const router = express.Router();
const {User , validate} = require('../models/user');
/// to reqister a user 
router.post('/',async (req,res)=>{
    const {error } = validate(req.body);
    if(error){
        res.status(500).send(error);
        return ;
    }
    let user = new User(req.body);
    try {

        user = await user.save();
        res.send(user);
    }
    catch(err){
        res.send(err.message);
    }

});
module.exports = router ;